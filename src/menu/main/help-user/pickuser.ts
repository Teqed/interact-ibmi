import ora from 'ora';
import diagnoseUsers from '../../../util/diagnose-users.js';
import { foundUsers } from '../../../util/sequelize/find-users.js';
import { generatedSelectMenu } from '../../generic.js';

export default async function () {
	const spinner = ora(`Checking...`).start();
	const query = foundUsers;
	spinner.succeed(`Users found!`);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const choices = query.map((row: any) => {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		return `${row.AUTHORIZATION_NAME}`;
	});
	const pickUserMenuChoice = await generatedSelectMenu({
		choices,
		message: `
		Select a user below.
		`,
	});
	void diagnoseUsers();
	return pickUserMenuChoice;
}
