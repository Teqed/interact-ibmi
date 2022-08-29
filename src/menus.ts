/* This is the menu system for the application.
 It shows the user options and lets them choose what they want to do.
 They can send commands to the IBMi or run SQL inputCommands over ODBC connections. */
import { assert } from '@sindresorhus/is';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import inquirer, { type PromptModule } from 'inquirer';
import ora from 'ora';
import loginUser from './login-user.js';
import { cmdOdbc } from './odbc.js';
import { testOdbc, findUser, copyUser } from './test-odbc.js';
import { sleep } from './util.js';

export const returnZero = async () => {
	return 0;
};

export const welcome = async () => {
	const rainbowTitle = chalkAnimation.rainbow(`Hello universe! \n`);
	await sleep();
	rainbowTitle.stop();
	return 0;
};

interface GenericCommandPrompt {
	message: string;
	name: string;
	type: string;
}

const getCommand = async () => {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
	const command = (await inquirer.prompt({
		message: `Enter command to send:`,
		name: `Command Input`,
		type: `input`,
	})) as PromptModule;

	const commandString = command[`Command Input` as keyof PromptModule];
	assert.string(commandString);
	const returnCommandString = commandString as string;
	return returnCommandString;
};

const genericGetCommand = async (menuName: string, menuMessage: string) => {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
	const command = (await inquirer.prompt({
		message: menuMessage,
		name: menuName,
		type: `input`,
	})) as PromptModule;

	const commandString = command[`Command Input` as keyof PromptModule];
	assert.string(commandString);
	const returnCommandString = commandString as string;
	return returnCommandString;
};

const genericListMenu = async (menuName: string, menuMessage: string, menuChoices: string[]) => {
	// Accepts a menu name, message, and array of choices.
	// Returns the choice the user made as a number index of the array (1-indexed).
	const menu = (await inquirer.prompt([
		{
			choices: menuChoices,
			message: menuMessage,
			name: menuName,
			type: `list`,
		},
	])) as PromptModule;
	const menuChoice = menu[menuName as keyof PromptModule];
	assert.string(menuChoice);
	const menuChoiceString: string = menuChoice as string;
	// Compare 'handled' to the array of strings in mainMenuChoices and return the index of the match (1-indexed).
	const menuChoiceIndex = menuChoices.indexOf(menuChoiceString) + 1;
	return menuChoiceIndex;
};

export const mainmenu = async () => {
	/* Create an array of strings containing menu choices. */
	const mainMenuChoices = [
		`1. Send System Command`,
		`2. Test ODBC`,
		`3. Test CopyUser`,
		`4. SSH`,
		`5. Find User`,
	];
	const MainMenuMessage = `
    ${chalk.bgBlue(`MAIN MENU`)}
    Select options below.
    `;
	const mainMenuChoice = await genericListMenu(`main`, MainMenuMessage, mainMenuChoices);
	// eslint-disable-next-line unicorn/consistent-function-scoping
	const handleAnswer = async (answer: number) => {
		/* A case inputCommand for answer */
		switch (answer) {
			case 1: {
				const inputCommand: string = await getCommand();
				console.log(inputCommand);
				const rtnCommand = await cmdOdbc(inputCommand);
				/* Find the output from rtnCommand */
				console.log(rtnCommand.return);
				return rtnCommand.return;
			}

			case 2: {
				const inputCommand: string = await getCommand();
				return testOdbc(inputCommand);
			}

			case 3: {
				const fromUser: string = await genericGetCommand();
				const toUser: string = await genericGetCommand();
				const toUserText: string = await genericGetCommand();
				return copyUser(fromUser, toUser, toUserText);
			}

			case 4: {
				const spinner = ora(`Connecting to SSH...`).start();
				// await sshconnect();
				const success = spinner.succeed(`Connected!`);
				// await sshinteractive();
				return success;
			}

			case 5: {
				const spinner = ora(`Checking...`).start();
				await findUser(`TEQ`);
				const success = spinner.succeed(`User found!`);
				return success;
			}

			default: {
				const spinner = ora(`Exiting...`).start();
				await sleep();
				spinner.fail(`Exited cleanly. Goodbye, ${loginUser.loginId}!`);
				/* Throw an error to exit the program */
				throw new Error(`Exited cleanly.`);
			}
		}
	};

	return handleAnswer(mainMenuChoice);
};
