import ora from 'ora';
import { foundUsers } from '../../../../util/find-users.js';
import deleteUser from '../../../../util/qcmdexc/dltusrprf.js';
import qcmdexc from '../../../../util/qcmdexc/qcmdexc.js';
import {
	genericPressEnterPrompt,
	generatedSelectMenu,
	genericConfirmPrompt,
} from '../../../generic.js';

export default async function () {
	const spinner = ora(`Checking...`).start();
	// Create an array of user ids.
	const users = foundUsers.map(user => user.AUTHORIZATION_NAME);
	if (users.length > 0) {
		spinner.succeed(`Users found!`);
		const pickUserMenuChoice = await generatedSelectMenu({
			choices: users,
			message: `
		Select a user from the list below to delete.
		`,
		});
		const confirm = await genericConfirmPrompt({
			clearPromptOnDone: false,
			message: `Are you sure you want to delete ${pickUserMenuChoice}?`,
		});
		if (confirm) {
			await qcmdexc(deleteUser({ USRPRF: pickUserMenuChoice }));
		}

		return genericPressEnterPrompt();
	}

	spinner.fail(`No users found.`);
	return genericPressEnterPrompt();
}
