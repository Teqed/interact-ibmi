import ora from 'ora';
import { foundUsers } from '../../../../util/find-users.js';
import changeUser from '../../../../util/qcmdexc/chgusrprf.js';
import qcmdexc from '../../../../util/qcmdexc/qcmdexc.js';
import {
	genericPressEnterPrompt,
	generatedSelectMenu,
	genericGetCommand,
} from '../../../generic/generic.js';

export default async function () {
	const spinner = ora(`Checking...`).start();
	// Create an array of user ids.
	const users = foundUsers.map(user => user.AUTHORIZATION_NAME);
	if (users.length > 0) {
		spinner.succeed(`Users found!`);
		const pickUserMenuChoice = await generatedSelectMenu({
			choices: users,
			message: `
		Select a user from the list below to change the password of.
		`,
		});
		const newPassword = await genericGetCommand({
			clearPromptOnDone: false,
			message: `Enter new password:`,
		});
		await qcmdexc(changeUser({ PASSWORD: newPassword, USRPRF: pickUserMenuChoice }));
		return genericPressEnterPrompt();
	}

	spinner.fail(`No users found.`);
	return genericPressEnterPrompt();
}
