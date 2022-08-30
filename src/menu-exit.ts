/* This is the menu system for the application.
 It shows the user options and lets them choose what they want to do.
 They can send commands to the IBMi or run SQL inputCommands over ODBC connections. */
import ora from 'ora';
import loginUser from './login-user.js';
import { sleep } from './util.js';

export default async function () {
	const spinner = ora(`Exiting...`).start();
	await sleep();
	spinner.fail(`Exited cleanly. Goodbye, ${loginUser.loginId}!`);
	/* Throw an error to exit the program */
	return new Error(`Exited cleanly.`);
}
