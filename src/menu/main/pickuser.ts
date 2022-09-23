import ora from 'ora';
import { queryOdbc } from '../../odbc-util.js';
import { generatedListMenu } from '../util.js';

export default async function () {
	const spinner = ora(`Checking...`).start();
	const query = await queryOdbc(`SELECT AUTHORIZATION_NAME, TEXT, STATUS FROM QSYS2.USER_INFO`);
	spinner.succeed(`Users found!`);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const choices = query.map((row: any) => {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		return `${row.AUTHORIZATION_NAME}`;
	});
	const pickUserMenuChoice = await generatedListMenu({
		choices,
		message: `
		Select a user below.
		`,
		name: `pickUser`,
	});
	return pickUserMenuChoice;
}
