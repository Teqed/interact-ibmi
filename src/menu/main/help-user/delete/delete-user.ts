import chalk from 'chalk';
import ora from 'ora';
import { foundUsers } from '../../../../util/find-users.js';
import deleteUser from '../../../../util/qcmdexc/dltusrprf.js';
import executeCommand from '../../../../util/qcmdexc/execute-command.js';
import { genericPressEnterPrompt, genericConfirmPrompt } from '../../../generic/generic.js';
import pickUser from '../pick-user.js';

export default async function () {
	const spinner = ora(`Checking...`).start();
	// Create an array of user ids.
	const users = foundUsers.map(user => user.AUTHORIZATION_NAME);
	if (users.length > 0) {
		spinner.succeed(`Users found!`);
		console.clear();
		console.log(
			chalk.bgBlue(
				// eslint-disable-next-line max-len
				`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Delete User\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`,
			),
		);
		const pickUserMenuChoice: string = await pickUser();
		const confirm = await genericConfirmPrompt({
			clearPromptOnDone: false,
			message: `Are you sure you want to delete ${pickUserMenuChoice}?`,
		});
		if (confirm) {
			// await qcmdexc(deleteUser({ USRPRF: pickUserMenuChoice }));
			await executeCommand(deleteUser({ USRPRF: pickUserMenuChoice }));
		}

		return genericPressEnterPrompt();
	}

	spinner.fail(`No users found.`);
	return genericPressEnterPrompt();
}
