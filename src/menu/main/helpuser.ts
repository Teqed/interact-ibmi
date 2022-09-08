import chalk from 'chalk';
import { genericListMenu } from '../util.js';
import findUserMenu from './finduser.js';

// Create an array of strings containing menu choices.
// eslint-disable-next-line import/prefer-default-export
export async function helpUsersMenu() {
	/* Create an array of strings containing menu choices. */
	const helpUsersMenuChoice = await genericListMenu({
		choices: [
			`1. Find User`,
			`2. Create User`,
			`3. Delete User`,
			`4. Change Password`,
			`5. Reenable User`,
			`6. Unlock User`,
			`7. Previous Menu`,
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
				// return await createUserMenu();
				break;
			}

			case 3: {
				// return await deleteUserMenu();
				break;
			}

			case 4: {
				// return await changePasswordMenu();
				break;
			}

			case 5: {
				// return await reenableUserMenu();
				break;
			}

			case 6: {
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
