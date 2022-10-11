import chalk from 'chalk';
import exitMenu, { exitMenuMain } from '../exit.js';
import { genericSelectMenu, genericPressEnterPrompt } from '../generic.js';
import cmdMenu from './cmd.js';
import helpUsersMenu from './help-user/help-user.js';
import odbcMenu from './odbc.js';
import testFunction from './test/test-function.js';
import testOdbc from './test/test-odbc.js';
import testSequelize from './test/test-sequelize.js';

export default async () => {
	const menuChoice = [
		`1. Send System Command`, // 0 - cmdMenu
		`2. Send SQL query`, // 1 - odbcMenu
		`3. Help Users`, // 2 - helpUsersMenu
		`4. Test prompt`, // 3 - testPrompt
		`5. Exit`, // default - exitMenu
	];
	// eslint-disable-next-line no-unmodified-loop-condition
	while (!exitMenuMain)
		/* Create an array of strings containing menu choices. */
		// eslint-disable-next-line no-await-in-loop
		await genericSelectMenu({
			choices: menuChoice,
			message: `
		${chalk.bgBlue(`Main Menu`)}
		Select options below.
		`,
		}).then(async answer => {
			switch (answer) {
				case menuChoice[0]: {
					return await cmdMenu();
				}

				case menuChoice[1]: {
					await odbcMenu();
					await genericPressEnterPrompt();
					return 0;
				}

				case menuChoice[2]: {
					return await helpUsersMenu();
				}

				case menuChoice[3]: {
					console.log(await testSequelize());
					await genericPressEnterPrompt();
					await testOdbc();
					await genericPressEnterPrompt();
					return 0;
				}

				default: {
					return await exitMenu();
				}
			}
		});
};
