import chalk from 'chalk';
import ora from 'ora';
import findUsers, { foundUsers } from '../../../util/find-users.js';
import CHGUSRPRF from '../../../util/qcmdexc/chgusrprf.js';
import QCMDEXC from '../../../util/qcmdexc/qcmdexc.js';
import { generatedSelectMenu, genericPressEnterPrompt } from '../../generic.js';

const pickDisabledUser = async function () {
	const spinner = ora(`Checking...`).start();
	// Create an array of user ids that are disabled.
	const usersDisabled = foundUsers
		.filter(user => user.NETSERVER_DISABLED === `YES`)
		.map(user => user.AUTHORIZATION_NAME);
	if (usersDisabled.length > 0) {
		spinner.succeed(`Disabled Netserver users found!`);
		const pickUserMenuChoice = await generatedSelectMenu({
			choices: usersDisabled,
			message: `
		Select a disabled Netserver user from the list below.
		`,
		});
		return pickUserMenuChoice;
	}

	spinner.succeed(`No disabled Netserver users found.`);
	await genericPressEnterPrompt();
	return ``;
};

export default async function () {
	const enableThisUser = await pickDisabledUser();
	if (enableThisUser.length > 0) {
		await QCMDEXC(CHGUSRPRF({ STATUS: `*ENABLED`, USRPRF: enableThisUser }))
			.then(() => {
				console.log(
					chalk.green(`User ${enableThisUser} has been re-enabled for Netserver.`),
				);
			})
			.catch(error => {
				console.log(error);
				console.log(
					chalk.yellow(`User ${enableThisUser} has not been re-enabled for Netserver.`),
				);
			});
	}

	void findUsers();
}
