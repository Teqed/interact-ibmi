import chalk from 'chalk';
import { genericListMenu } from './menu-util.js';
import exitMenu from './menu-exit.js';
import findUserMenu from './menu-main-finduser.js';
import sshMenu from './menu-main-ssh.js';
import copyUserMenu from './menu-main-copyuser.js';
import odbcMenu from './menu-main-odbc.js';
import cmdMenu from './menu-main-cmd.js';
import { helpUsersMenu } from './menu-main-helpuser.js';

export default async () => {
	try {
		/* Create an array of strings containing menu choices. */
		const mainMenuChoice = await genericListMenu({
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
		});

		const handleAnswer = async (answer: number) => {
			/* A case inputCommand for answer */
			switch (answer) {
				case 1: {
					return await cmdMenu();
				}

				case 2: {
					return await odbcMenu();
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
		};

		return handleAnswer(mainMenuChoice);
	} catch (error: unknown) {
		return error;
	}
};
