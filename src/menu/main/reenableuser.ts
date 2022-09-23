import chalk from 'chalk';
import { cmdOdbc } from '../../odbc-util.js';
import { CHGUSRPRF } from '../../qcmdexc-util.js';
import pickUser from './pickuser.js';

export default async function () {
	const enableThisUser = await pickUser();
	await cmdOdbc(CHGUSRPRF({ STATUS: `*ENABLED`, USRPRF: enableThisUser }))
		.then(() => {
			console.log(chalk.green(`User ${enableThisUser} has been re-enabled.`));
		})
		.catch(error => {
			console.log(error);
			console.log(chalk.yellow(`User ${enableThisUser} has not been re-enabled.`));
		});
}
