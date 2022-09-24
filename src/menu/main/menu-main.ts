import chalk from 'chalk';
import { genericListMenu } from '../generic.js';
import exitMenu, { exitMenuMain } from '../exit.js';
import odbcMenu from './odbc.js';
import cmdMenu from './cmd.js';
import helpUsersMenu from './help-user/help-user.js';

export default async () => {
	while (!exitMenuMain)
		/* Create an array of strings containing menu choices. */
		// eslint-disable-next-line no-await-in-loop
		await genericListMenu({
			choices: [`1. Send System Command`, `2. Send SQL query`, `3. Help Users`, `4. Exit`],
			message: `
		${chalk.bgBlue(`Main Menu`)}
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
					return await helpUsersMenu();
				}

				case 4: {
					return await exitMenu();
				}

				default: {
					return await exitMenu();
				}
			}
		});
};
