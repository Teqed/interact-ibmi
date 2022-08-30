/* This is the menu system for the application.
 It shows the user options and lets them choose what they want to do.
 They can send commands to the IBMi or run SQL inputCommands over ODBC connections. */
import { assert } from '@sindresorhus/is';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import inquirer, { type PromptModule } from 'inquirer';
import ora from 'ora';
import { type GenericInputPrompt, type GenericListPrompt } from './types';
import loginUser from './login-user.js';
import { cmdOdbc } from './odbc.js';
import { testOdbc, findUser, copyUser } from './test-odbc.js';
import { sleep } from './util.js';

const genericGetCommand = async (prompt: GenericInputPrompt) => {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
	const command = (await inquirer.prompt({
		message: prompt.message,
		name: prompt.name,
		type: `input`,
	})) as PromptModule;

	const commandString = command[prompt.name as keyof PromptModule];
	assert.string(commandString);
	const returnCommandString = commandString as string;
	return returnCommandString;
};

const genericListMenu = async (prompt: GenericListPrompt) => {
	// Accepts a menu name, message, and array of choices.
	// Returns the choice the user made as a number index of the array (1-indexed).
	const menu = (await inquirer.prompt([
		{
			choices: prompt.choices,
			message: prompt.message,
			name: prompt.name,
			type: `list`,
		},
	])) as PromptModule;
	const menuChoice = menu[prompt.name as keyof PromptModule];
	assert.string(menuChoice);
	const menuChoiceString: string = menuChoice as string;
	// Compare 'handled' to the array of strings in mainMenuChoices and return the index of the match (1-indexed).
	const menuChoiceIndex = prompt.choices.indexOf(menuChoiceString) + 1;
	return menuChoiceIndex;
};

async function cmdMenu() {
	const inputCommand: string = await genericGetCommand({
		message: `Enter command to send:`,
		name: `Command Input`,
	});
	console.log(inputCommand);
	const rtnCommand = await cmdOdbc(inputCommand);
	/* Find the output from rtnCommand */
	console.log(rtnCommand.return);
	return rtnCommand.return;
}

async function odbcMenu() {
	const inputCommand: string = await genericGetCommand({
		message: `Enter SQL query:`,
		name: `ODBC DB Query`,
	});
	return testOdbc(inputCommand);
}

export const returnZero = async () => {
	return 0;
};

async function copyUserMenu() {
	const fromUser: string = await genericGetCommand({
		message: `Enter user ID to copy from:`,
		name: `From User`,
	});
	const toUser: string = await genericGetCommand({
		message: `Enter user ID to copy to:`,
		name: `To User`,
	});
	const toUserText: string = await genericGetCommand({
		message: `Enter user description:`,
		name: `Description`,
	});
	await copyUser(fromUser, toUser, toUserText);
	return 0;
}

async function sshMenu() {
	const spinner = ora(`Connecting to SSH...`).start();
	await sleep(100);
	// await sshconnect();
	const success = spinner.succeed(`Connected!`);
	// await sshinteractive();
	return success;
}

async function findUserMenu() {
	const spinner = ora(`Checking...`).start();
	await findUser(`TEQ`);
	const success = spinner.succeed(`User found!`);
	return success;
}

async function exitMenu() {
	const spinner = ora(`Exiting...`).start();
	await sleep();
	spinner.fail(`Exited cleanly. Goodbye, ${loginUser.loginId}!`);
	/* Throw an error to exit the program */
	return new Error(`Exited cleanly.`);
}

export const welcome = async () => {
	const rainbowTitle = chalkAnimation.rainbow(`Hello universe! \n`);
	await sleep();
	rainbowTitle.stop();
	return 0;
};

export const mainmenu = async () => {
	/* Create an array of strings containing menu choices. */
	const mainMenuChoice = await genericListMenu({
		choices: [
			`1. Send System Command`,
			`2. Test ODBC`,
			`3. Test CopyUser`,
			`4. SSH`,
			`5. Find User`,
		],
		message: `
		${chalk.bgBlue(`MAIN MENU`)}
		Select options below.
		`,
		name: `main`,
	});
	// eslint-disable-next-line unicorn/consistent-function-scoping
	const handleAnswer = async (answer: number) => {
		/* A case inputCommand for answer */
		switch (answer) {
			case 1: {
				return await cmdMenu();
			}

			case 2: {
				return await odbcMenu();
			}

			case 3: {
				return await copyUserMenu();
			}

			case 4: {
				return await sshMenu();
			}

			case 5: {
				return await findUserMenu();
			}

			default: {
				return await exitMenu();
			}
		}
	};

	return handleAnswer(mainMenuChoice);
};
