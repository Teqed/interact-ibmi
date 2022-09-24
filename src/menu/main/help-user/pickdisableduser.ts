import ora from 'ora';
import { generatedSelectMenu } from '../../generic.js';
import { foundUsers } from '../../../util/find-users.js';

export default async function () {
	const spinner = ora(`Checking...`).start();
	// Create an array of user ids that are disabled.
	const usersDisabled = foundUsers
		.filter(user => user.STATUS === `*DISABLED`)
		.map(user => user.AUTHORIZATION_NAME);
	if (usersDisabled.length > 0) {
		spinner.succeed(`Disabled users found!`);
		const pickUserMenuChoice = await generatedSelectMenu({
			choices: usersDisabled,
			message: `
		Select a disabled user from the list below.
		`,
		});
		return pickUserMenuChoice;
	}

	spinner.succeed(`No disabled users found.`);
	return ``;
}
