import ora from 'ora';
import { findUser } from './test-odbc.js';

export default async function () {
	const spinner = ora(`Checking...`).start();
	try {
		const find = await findUser(`TEQ`);
		spinner.succeed(`User found!`);
		return find;
	} catch (error: unknown) {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		spinner.fail(`Error: ${error}`);
		return error;
	}
}
