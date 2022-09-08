import chalk from 'chalk';
import { genericListMenu } from '../util.js';
import exitMenu, { exitMenuMain } from '../exit.js';
import findUserMenu from './finduser.js';
import sshMenu from './ssh.js';
import copyUserMenu from './copyuser.js';
import odbcMenu from './odbc.js';
import cmdMenu from './cmd.js';
import { helpUsersMenu } from './helpuser.js';

export default async () => {
	while (!exitMenuMain)
		/* Create an array of strings containing menu choices. */
		// eslint-disable-next-line no-await-in-loop
		await genericListMenu({
			choices: [
				`1. Send System Command`,
				`2. Test ODBC`,
				`3. Test CopyUser`,
				`4. SSH`,
				`5. Find User`,
				`6. Help Users`,
				`7. Exit`,
			],
			message: `
		${chalk.bgBlue(`MAIN MENU`)}
		Select options below.
		`,
			name: `main`,
		}).then(async answer => {
			switch (answer) {
				case 1: {
					return await cmdMenu();
				}

				case 2: {
					await odbcMenu();
					return 0;
				}

				case 3: {
					return await copyUserMenu();
				}

				case 4: {
					return await sshMenu();
				}

				case 5: {
					return await findUserMenu();
				}

				case 6: {
					return await helpUsersMenu();
				}

				case 7: {
					return await exitMenu();
				}

				default: {
					return await exitMenu();
				}
			}
		});
};
