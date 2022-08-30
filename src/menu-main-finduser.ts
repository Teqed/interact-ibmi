import ora from 'ora';
import { findUser } from './test-odbc.js';

export default async function () {
	const spinner = ora(`Checking...`).start();
	await findUser(`TEQ`);
	const success = spinner.succeed(`User found!`);
	return success;
}
