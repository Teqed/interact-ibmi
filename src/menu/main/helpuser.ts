import chalk from 'chalk';
import { genericListMenu } from '../util.js';
import copyuser from './copyuser.js';
import findUserMenu from './finduser.js';
import reenableUserMenu from './reenableuser.js';

// Create an array of strings containing menu choices.
// eslint-disable-next-line import/prefer-default-export
export async function helpUsersMenu() {
	/* Create an array of strings containing menu choices. */
	const helpUsersMenuChoice = await genericListMenu({
		choices: [
			`1. Find User`,
			`2. Copy User`,
			`3. (WIP) Create User`,
			`4. (WIP) Delete User`,
			`5. (WIP) Change User Password`,
			`6. Reenable User`,
			`7. (WIP) Unlock NetDrive User`,
			`8. Previous Menu`,
		],
		message: `
		${chalk.bgBlue(`Help Users Menu`)}
		Choose a utility below.
		`,
		name: `main`,
	});
	// eslint-disable-next-line unicorn/consistent-function-scoping
	const handleAnswer = async (answer: number) => {
		/* A case inputCommand for answer */
		switch (answer) {
			case 1: {
				return await findUserMenu();
			}

			case 2: {
				return await copyuser();
			}

			case 3: {
				// return await createUserMenu();
				break;
			}

			case 4: {
				// return await deleteUserMenu();
				break;
			}

			case 5: {
				// return await changePasswordMenu();
				break;
			}

			case 6: {
				await reenableUserMenu();
				break;
			}

			case 7: {
				// return await unlockUserMenu();
				break;
			}

			default: {
				break;
			}
		}

		return 1;
	};

	return handleAnswer(helpUsersMenuChoice);
}
