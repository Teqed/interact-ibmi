#! /usr/bin/env node
/* eslint-disable node/shebang */
/* This is the entry point for the application.
It welcomes the user, asks for their username and password, then shows them the command line.
Then, they can run the start command to see the main menu. */
// @ts-expect-error There is no declaration file for the package.
import InterruptedPrompt from 'inquirer-interrupted-prompt';
import { diagnoseUsers } from './menu/login-util.js';
import login from './menu/login.js';
import mainMenu from './menu/main/menu-main.js';
// import { welcome } from './util.js';

const start = async () => {
	try {
		// await welcome();
		await login();
		await diagnoseUsers();
		await mainMenu();
	} catch (error: unknown) {
		if (error === InterruptedPrompt.EVENT_INTERRUPTED) {
			console.log(``);
			console.log(`You have interrupted the prompt. Please try again.`);
			console.log(``);
			await mainMenu();
		} else {
			console.log(error);
		}
	}
};

await start();
