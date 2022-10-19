import chalk from 'chalk';
import { genericSelectMenu } from '../../generic.js';
import changePasswordMenu from './change/change-password.js';
import copyuser from './copy/copyuser.js';
import deleteUserMenu from './delete/delete-user.js';
import displayUserMenu from './display-user.js';
import reenableNetserverUser from './reenable-netserver-user.js';
import reenableUserMenu from './reenable-user.js';

// Create an array of strings containing menu choices.
export default async function () {
	/* Create an array of strings containing menu choices. */
	const menuChoice = [
		`1. Display User`, // 0 - displayUserMenu
		`2. Copy User`, // 1 - copyuser
		`3. Delete User`, // 2 - deleteuser
		`4. Change User Password`, // 3 - changeuserpassword
		`5. Reenable User`, // 4 - reenableUserMenu
		`6. Unlock Netserver User`, // 5 - reenableNetserverUser
		`7. Previous Menu`, // 6 - exitMenu
	];

	const helpUsersMenuChoice = await genericSelectMenu({
		choices: menuChoice,
		message: `
		${chalk.bgBlue(`Help Users Menu`)}
		Choose a utility below.
		`,
	});
	const handleAnswer = async (answer: string) => {
		/* A case inputCommand for answer */
		switch (answer) {
			case menuChoice[0]: {
				return await displayUserMenu();
			}

			case menuChoice[1]: {
				return await copyuser();
			}

			case menuChoice[2]: {
				return await deleteUserMenu();
				break;
			}

			case menuChoice[3]: {
				return await changePasswordMenu();
				break;
			}

			case menuChoice[4]: {
				await reenableUserMenu();
				break;
			}

			case menuChoice[5]: {
				await reenableNetserverUser();
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
