import ora from 'ora';
import { generatedListMenu } from '../util.js';
import diagnoseUsers from '../diagnose-users.js';
import { foundUsers } from '../find-users.js';

export default async function () {
	const spinner = ora(`Checking...`).start();
	const query = foundUsers;
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
	void diagnoseUsers();
	return pickUserMenuChoice;
}
