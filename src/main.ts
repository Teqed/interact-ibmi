#! /usr/bin/env node
/* eslint-disable node/shebang */
// @ts-expect-error There is no declaration file for the package.
import InterruptedPrompt from 'inquirer-interrupted-prompt';
import findUsers from './util/find-users.js';
import login from './menu/login/login.js';
import mainMenu from './menu/main/menu-main.js';
// import { welcome } from './util.js';

// eslint-disable-next-line import/no-mutable-exports
let foundUserDiagnostics;

const start = async () => {
	try {
		// await welcome();
		await login();
		foundUserDiagnostics = findUsers();
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

// eslint-disable-next-line import/prefer-default-export
export { foundUserDiagnostics };

await start();
