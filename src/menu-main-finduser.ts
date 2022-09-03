import ora from 'ora';
import { queryOdbc, getvalues } from './odbc-util.js';
import { generatedListMenu } from './menu-util.js';

const findUser = async (user: string) => {
	const query = await queryOdbc(
		`SELECT * FROM QSYS2.USER_INFO WHERE AUTHORIZATION_NAME = '${user}'`,
	);
	getvalues(query);
	return query;
};

const findUser0 = async () => {
	const query = await queryOdbc(`SELECT AUTHORIZATION_NAME, TEXT, STATUS FROM QSYS2.USER_INFO`);
	// Create an array of strings containing menu choices made of the query results.
	const choices = query.map((row: any) => {
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
	return findUser(findUserMenuChoice);
};

export default async function () {
	// const spinner = ora(`Checking...`).start();
	try {
		const find = await findUser0();
		// spinner.succeed(`User found!`);
		return find;
	} catch (error: unknown) {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		// spinner.fail(`Error: ${error}`);
		return error;
	}
}
