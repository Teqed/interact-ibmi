import ora from 'ora';
import { foundUsers } from '../../../util/find-users.js';
import { generatedSelectMenu } from '../../generic.js';
import { sleep } from '../../../util.js';
import getRows from '../../../util/odbc/get-rows-odbc.js';

const fullUserInfo = async (user: string) => {
	const query = `SELECT * FROM QSYS2.USER_INFO WHERE AUTHORIZATION_NAME = '${user}'`;
	const result = await getRows(query);
	console.log(result);
	return result;
};

const findUserPrompt = async () => {
	// Create an array of strings containing menu choices made of the query results.
	// Make sure that foundUsers is not undefined. If it is, sleep for 100 ms and try again.
	const spinner = ora(`Finding users...`).start();
	while (foundUsers === undefined) {
		// eslint-disable-next-line no-await-in-loop
		await sleep(100);
	}

	spinner.succeed(`Users found!`);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const choices = foundUsers.map((row: any) => {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		return `${row.AUTHORIZATION_NAME}`;
	});
	const findUserMenuChoice = await generatedSelectMenu({
		choices,
		message: `
		Select a user.
		`,
	});
	return fullUserInfo(findUserMenuChoice);
};

export default async function () {
	try {
		return await findUserPrompt();
	} catch (error: unknown) {
		return error;
	}
}
