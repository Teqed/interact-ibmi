/* This is the entry point for the application.
It welcomes the user, asks for their username and password, then shows them the command line.
Then, they can run the start command to see the main menu. */
import { login } from './login.js';
import { welcome, mainmenu } from './menus.js';

export default async () => {
	try {
		await welcome();
		await login();
		await mainmenu();
	} catch (error: unknown) {
		console.log(error);
	}
};
