import ora from 'ora';
import { queryOdbc, getrows } from '../../../util/odbc/odbc-util.js';
import { foundUsers } from '../../../util/find-users.js';
import { generatedListMenu } from '../../generic.js';
import { sleep } from '../../../util.js';

const fullUserInfo = async (user: string) => {
	const spinner = ora(`Checking...`).start();
	const query = await queryOdbc(
		`SELECT * FROM QSYS2.USER_INFO WHERE AUTHORIZATION_NAME = '${user}'`,
	);
	spinner.succeed(`User found!`);
	getrows(query);
	return query;
};

const findUserPrompt = async () => {
	// Create an array of strings containing menu choices made of the query results.
	// Make sure that foundUsers is not undefined. If it is, sleep for 100 ms and try again.
	while (foundUsers === undefined) {
		const spinner = ora(`Finding users...`).start();
		// eslint-disable-next-line no-await-in-loop
		await sleep(100);
		if (foundUsers !== undefined) {
			spinner.succeed(`Users found!`);
			break;
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const choices = foundUsers.map((row: any) => {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		return `${row.AUTHORIZATION_NAME}`;
	});
	const findUserMenuChoice = await generatedListMenu({
		choices,
		message: `
		Select options below.
		`,
		name: `findUser`,
	});
	return fullUserInfo(findUserMenuChoice);
};

export default async function () {
	try {
		const find = await findUserPrompt();
		return find;
	} catch (error: unknown) {
		return error;
	}
}
