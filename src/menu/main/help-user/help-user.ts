import chalk from 'chalk';
import { genericListMenu } from '../../generic.js';
import copyuser from './copyuser.js';
import displayUserMenu from './display-user.js';
import reenableUserMenu from './reenableuser.js';

// Create an array of strings containing menu choices.
export default async function () {
	/* Create an array of strings containing menu choices. */
	const helpUsersMenuChoice = await genericListMenu({
		choices: [
			`1. Display User`,
			`2. Copy User`,
			`3. (WIP) Delete User`,
			`4. (WIP) Change User Password`,
			`5. Reenable User`,
			`6. (WIP) Unlock NetDrive User`,
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
				return await displayUserMenu();
			}

			case 2: {
				return await copyuser();
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
				await reenableUserMenu();
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
