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

/* Create an array of strings containing menu choices. */
const mainMenuChoices = [
	`1. Send System Command`,
	`2. Test ODBC`,
	`3. Test CopyUser`,
	`4. SSH`,
	`5. Find User`,
];

export const returnZero = async () => {
	return 0;
};

export const welcome = async () => {
	const rainbowTitle = chalkAnimation.rainbow(`Hello universe! \n`);
	await sleep();
	rainbowTitle.stop();
	return 0;
};

const getCommand = async () => {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
	const command = (await inquirer.prompt({
		message: `Enter inputCommand to send:`,
		name: `cmdinput`,
		type: `input`,
	})) as PromptModule;

	// eslint-disable-next-line @typescript-eslint/no-base-to-string
	const inputCommand: string = command[`cmdinput` as keyof PromptModule].toString();
	return inputCommand;
};

const handleAnswer = async (answer: string) => {
	/* A case inputCommand for answer */
	switch (answer) {
		case mainMenuChoices[0]: {
			const inputCommand: string = await getCommand();
			console.log(inputCommand);
			const rtnCommand = await cmdOdbc(inputCommand);
			/* Find the output from rtnCommand */
			console.log(rtnCommand.return);
			break;
		}

		case mainMenuChoices[1]: {
			const inputCommand: string = await getCommand();
			await testOdbc(inputCommand);
			break;
		}

		case mainMenuChoices[2]: {
			const fromUser: string = await getCommand();
			const toUser: string = await getCommand();
			const toUserText: string = await getCommand();
			await copyUser(fromUser, toUser, toUserText);
			break;
		}

		case mainMenuChoices[3]: {
			const spinner = ora(`Connecting to SSH...`).start();
			// await sshconnect();
			spinner.succeed(`Connected!`);
			// await sshinteractive();
			break;
		}

		case mainMenuChoices[4]: {
			const spinner = ora(`Checking...`).start();
			await findUser(`TEQ`);
			spinner.succeed(`User found!`);
			break;
		}

		default: {
			const spinner = ora(`Exiting...`).start();
			await sleep();
			spinner.fail(`Exited cleanly. Goodbye, ${loginUser.loginId}!`);
			/* Throw an error to exit the program */
			throw new Error(`Exited cleanly.`);
		}
	}

	return handleAnswer;
};

export const mainmenu = async () => {
	const menuName = `main`;
	const menu = (await inquirer.prompt({
		choices: mainMenuChoices,
		message: `
    ${chalk.bgBlue(`MAIN MENU`)}
    Select options below.
    `,
		name: menuName,
		type: `list`,
	})) as PromptModule;
	const mainAnswer = menu[menuName as keyof PromptModule];
	assert.string(mainAnswer);
	await handleAnswer(mainAnswer as string);
};
