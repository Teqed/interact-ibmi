/* This is the menu system for the application.
 It shows the user options and lets them choose what they want to do.
 They can send commands to the IBMi or run SQL inputCommands over ODBC connections. */
import ansicolors from 'ansi-colors';
import inquirer from 'enquirer';
import type Enquirer from 'enquirer';
import { createSpinner } from 'nanospinner';
import loginUser from './login-user.js';
import { testOdbc, findUser, copyUser } from './test-odbc.js';
// import { sshcmd, sshconnect, sshinteractive } from './ssh.js';
import { sleep } from './util.js';

/* Create an array of strings containing menu choices. */
const menuChoices = [
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
	// const rainbowTitle = ansicolorsAnimation.rainbow(`Hello universe! \n`);
	// await sleep();
	// rainbowTitle.stop();
	return 0;
};

const getCommand = async () => {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
	const command = (await inquirer.prompt({
		message: `Enter inputCommand to send:`,
		name: `cmdinput`,
		type: `input`,
	})) as Enquirer;

	const inputCommand: string = command[`cmdinput` as keyof Enquirer].toString();
	return inputCommand;
};

const handleAnswer = async (answer: string) => {
	/* A case inputCommand for answer */
	switch (answer) {
		case menuChoices[0]: {
			// const inputCommand: string = await getCommand();
			// const rtnCommand = await sshcmd({
			// 	cmd: inputCommand,
			// 	stdin: ``,
			// });
			/* Find the output from rtnCommand */
			// console.log(rtnCommand.stdout);
			// console.log(rtnCommand.stderr);
			break;
		}

		case menuChoices[1]: {
			const inputCommand: string = await getCommand();
			await testOdbc(inputCommand);
			break;
		}

		case menuChoices[2]: {
			const fromUser: string = await getCommand();
			const toUser: string = await getCommand();
			const toUserText: string = await getCommand();
			await copyUser(fromUser, toUser, toUserText);
			break;
		}

		case menuChoices[3]: {
			const spinner = createSpinner(`Connecting to SSH...`).start();
			// await sshconnect();
			spinner.success({
				mark: `✅`,
				text: `Connected!`,
			});
			// await sshinteractive();
			break;
		}

		case menuChoices[4]: {
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
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
	const menu = (await inquirer.prompt({
		choices: menuChoices,
		message: `
    ${ansicolors.bgBlue(`MAIN MENU`)}
    Select options below.
    `,
		name: `main`,
		type: `select`,
	})) as Enquirer;

	await handleAnswer(menu[`main` as keyof typeof menu].toString());
};
