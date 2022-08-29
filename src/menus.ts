/* This is the menu system for the application.
 It shows the user options and lets them choose what they want to do.
 They can send commands to the IBMi or run SQL inputCommands over ODBC connections. */
import ansicolors from 'ansi-colors';
import enquirer from 'enquirer';
import { createSpinner } from 'nanospinner';
import loginUser from './login-user.js';
import { cmdOdbc } from './odbc.js';
import { testOdbc, findUser, copyUser } from './test-odbc.js';
import { sleep } from './util.js';

export const returnZero = async () => {
	return 0;
};

export const welcome = async () => {
	console.log(`Hello universe! \n`);
};

const getCommand = async () => {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
	const command = (await enquirer.prompt({
		message: `Enter inputCommand to send:`,
		name: `cmdinput`,
		type: `input`,
	})) as enquirer;

	const inputCommand: string = command[`cmdinput` as keyof enquirer].toString();
	return inputCommand;
};

const handleAnswer = async (answer: number) => {
	/* A case inputCommand for answer */
	switch (answer) {
		case 0: {
			// Send System Command
			const inputCommand: string = await getCommand();
			console.log(inputCommand);
			const rtnCommand = await cmdOdbc(inputCommand);
			/* Find the output from rtnCommand */
			console.log(rtnCommand.return);
			break;
		}

		case 1: {
			const inputCommand: string = await getCommand();
			await testOdbc(inputCommand);
			break;
		}

		case 2: {
			const fromUser: string = await getCommand();
			const toUser: string = await getCommand();
			const toUserText: string = await getCommand();
			await copyUser(fromUser, toUser, toUserText);
			break;
		}

		case 3: {
			const spinner = createSpinner(`Connecting to SSH...`).start();
			// await sshconnect();
			spinner.success({
				mark: `✅`,
				text: `Connected!`,
			});
			// await sshinteractive();
			break;
		}

		case 4: {
			const spinner = createSpinner(`Checking...`).start();
			await findUser(`TEQ`);
			spinner.success({
				text: `User found!`,
			});
			break;
		}

		default: {
			const spinner = createSpinner(`Exiting...`).start();
			await sleep();
			spinner.error({
				text: `Exited cleanly. Goodbye, ${loginUser.loginId}!`,
			});
			/* Throw an error to exit the program */
			// throw new Error(`Exited cleanly.`);
			break;
		}
	}

	return handleAnswer;
};

export const mainmenu = async () => {
	/* Create an array of strings containing menu choices. */
	const menuChoices = [
		{
			cursor: 0,
			enabled: false,
			indent: ``,
			index: 0,
			input: ``,
			level: 1,
			message: `0. Send System Command`,
			name: `0. Send System Command`,
			normalized: true,
			path: `0. Send System Command`,
			value: `0. Send System Command`,
		},
		{
			cursor: 0,
			enabled: false,
			indent: ``,
			index: 1,
			input: ``,
			level: 1,
			message: `1. Test ODBC`,
			name: `1. Test ODBC`,
			normalized: true,
			path: `1. Test ODBC`,
			value: `1. Test ODBC`,
		},
		{
			cursor: 0,
			enabled: false,
			indent: ``,
			index: 2,
			input: ``,
			level: 1,
			message: `2. Test CopyUser`,
			name: `2. Test CopyUser`,
			normalized: true,
			path: `2. Test CopyUser`,
			value: `2. Test CopyUser`,
		},
		{
			cursor: 0,
			enabled: false,
			indent: ``,
			index: 3,
			input: ``,
			level: 1,
			message: `3. Find User`,
			name: `3. Find User`,
			normalized: true,
			path: `3. Find User`,
			value: `3. Find User`,
		},
		{
			cursor: 0,
			enabled: false,
			indent: ``,
			index: 4,
			input: ``,
			level: 1,
			message: `4. Exit`,
			name: `4. Exit`,
			normalized: true,
			path: `4. Exit`,
			value: `4. Exit`,
		},
	];
	const menuName = `main`;
	await enquirer.prompt({
		choices: menuChoices,
		message: ansicolors.bgBlue(`  MAIN MENU  `),
		name: menuName,
		type: `select`,
	});

	await handleAnswer(menuChoices.findIndex(item => item.enabled));
};
