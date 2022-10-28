import chalk from 'chalk';
import ora from 'ora';
import findUsers, { foundUsers } from '../../../util/find-users.js';
import CHGUSRPRF from '../../../util/qcmdexc/chgusrprf.js';
import QCMDEXC from '../../../util/qcmdexc/qcmdexc.js';
import { generatedSelectMenu, genericPressEnterPrompt } from '../../generic/generic.js';

const pickDisabledUser = async function () {
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
	await genericPressEnterPrompt();
	return ``;
};

export default async function () {
	const enableThisUser = await pickDisabledUser();
	if (enableThisUser.length > 0) {
		await QCMDEXC(CHGUSRPRF({ STATUS: `*ENABLED`, USRPRF: enableThisUser }))
			.then(() => {
				console.log(chalk.green(`User ${enableThisUser} has been re-enabled.`));
			})
			.catch(error => {
				console.log(error);
				console.log(chalk.yellow(`User ${enableThisUser} has not been re-enabled.`));
			});
	}

	void findUsers();
}
