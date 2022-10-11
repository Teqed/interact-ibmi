import chalk from 'chalk';
import findUsers from '../../../util/find-users.js';
import CHGUSRPRF from '../../../util/qcmdexc/chgusrprf.js';
import QCMDEXC from '../../../util/qcmdexc/qcmdexc.js';
import pickDisabledUser from './pickdisableduser.js';

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
