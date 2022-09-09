import chalk from 'chalk';
import { queryOdbc } from '../odbc-util.js';
import { type BriefIbmiUserInterface } from '../types.js';

// eslint-disable-next-line import/prefer-default-export
export async function diagnoseUsers() {
	const sqlqry = `
SELECT ACCOUNTING_CODE, AUTHORIZATION_NAME, DAYS_UNTIL_PASSWORD_EXPIRES, 
INITIAL_MENU_LIBRARY_NAME, INITIAL_MENU_NAME, INITIAL_PROGRAM_LIBRARY_NAME, INITIAL_PROGRAM_NAME,
LIMIT_CAPABILITIES, MESSAGE_QUEUE_DELIVERY_METHOD, 
MESSAGE_QUEUE_LIBRARY_NAME, MESSAGE_QUEUE_NAME, MESSAGE_QUEUE_SEVERITY, NETSERVER_DISABLED, NO_PASSWORD_INDICATOR, 
OBJECT_AUDITING_VALUE, OUTPUT_QUEUE_LIBRARY_NAME, OUTPUT_QUEUE_NAME, PASSWORD_CHANGE_DATE, 
PASSWORD_EXPIRATION_INTERVAL, PREVIOUS_SIGNON, SET_PASSWORD_TO_EXPIRE, SIGN_ON_ATTEMPTS_NOT_VALID, 
SPECIAL_AUTHORITIES, STATUS, TEXT_DESCRIPTION, USER_DEFAULT_PASSWORD, USER_EXPIRATION_INTERVAL, 
USER_ID_NUMBER FROM QSYS2.USER_INFO_BASIC`;

	const findUserDianostics = await queryOdbc(sqlqry);
	const foundUserDiagnostics: BriefIbmiUserInterface[] =
		findUserDianostics as unknown as BriefIbmiUserInterface[];

	// Create an array of user ids that are disabled.
	const usersDiabled = foundUserDiagnostics
		.filter(user => user.STATUS === `*DISABLED`)
		.map(user => user.AUTHORIZATION_NAME);

	// If there are any users disabled, log a message listing their names.
	if (usersDiabled.length > 0) {
		console.log(chalk.blue(`The following users are disabled: ${usersDiabled.join(`, `)}`));
	}

	// Create an array of user ids that are expired.
	// We'll know because the days until password expires is less than 0.
	// If user.DAYS_UNTIL_PASSWORD_EXPIRES is null, it's not expired.
	const usersExpired = foundUserDiagnostics
		.filter(
			user =>
				user.DAYS_UNTIL_PASSWORD_EXPIRES !== null && user.DAYS_UNTIL_PASSWORD_EXPIRES < 0,
		)
		.map(user => user.AUTHORIZATION_NAME);

	// If there are any users expired, log a message listing their names.
	if (usersExpired.length > 0) {
		console.log(chalk.blue(`The following users are expired: ${usersExpired.join(`, `)}`));
	}

	// Create an array of user ids that are NETSERVER_DISABLED.
	const usersNetServerDisabled = foundUserDiagnostics
		.filter(user => user.NETSERVER_DISABLED === `YES`)
		.map(user => user.AUTHORIZATION_NAME);

	// If there are any users NETSERVER_DISABLED, log a message listing their names.
	if (usersNetServerDisabled.length > 0) {
		console.log(
			chalk.blue(
				`The following users are NETSERVER_DISABLED: ${usersNetServerDisabled.join(`, `)}`,
			),
		);
	}

	// Find the 3 most popular combination of values for users.INITIAL_PROGRAM_NAME
	// and users.INITIAL_PROGRAM_LIBRARY_NAME on foundUserDiagnostics.
	// Use a for each loop.
	// Create an object with the keys being the combination of INITIAL_PROGRAM_NAME and INITIAL_PROGRAM_LIBRARY_NAME
	// and the values being the number of times that combination appears.
	// Use the object to find the 3 most popular INITIAL_PROGRAM_NAME and INITIAL_PROGRAM_LIBRARY_NAME combinations.
	// Log a message listing the 3 most popular INITIAL_PROGRAM_NAME and INITIAL_PROGRAM_LIBRARY_NAME combinations,
	// and how many times they appear.

	// Create an object with the keys being the combination of INITIAL_PROGRAM_NAME and INITIAL_PROGRAM_LIBRARY_NAME
	// and the values being the number of times that combination appears.
	const initialProgramAndLibrary: Record<string, number> = {};
	foundUserDiagnostics.forEach(user => {
		const key = `${user.INITIAL_PROGRAM_NAME} ${user.INITIAL_PROGRAM_LIBRARY_NAME}`;
		if (initialProgramAndLibrary[key]) {
			initialProgramAndLibrary[key] += 1;
		} else {
			initialProgramAndLibrary[key] = 1;
		}
	});

	// Use the object to find the 3 most popular INITIAL_PROGRAM_NAME and INITIAL_PROGRAM_LIBRARY_NAME combinations.
	// Sort them by the number of times they appear.
	const initialProgramArray = Object.entries(initialProgramAndLibrary).sort(
		(a, b) => b[1] - a[1],
	);

	// Log a message listing the 3 most popular INITIAL_PROGRAM_NAME and INITIAL_PROGRAM_LIBRARY_NAME combinations,
	// and how many times they appear.
	console.log(chalk.yellow(`The most popular initial programs are:`));
	for (let index = 0; index < 3; index += 1) {
		if (initialProgramArray[index]) {
			console.log(
				chalk.blue(
					`${initialProgramArray[index][0]} used by ${initialProgramArray[index][1]}`,
				),
			);
		}
	}

	// Find the 3 most popular combination of values for users.OUTOUT_QUEUE_NAME and users.OUTPUT_QUEUE_LIBRARY_NAME
	// Use a for each loop.
	// Create an object with the keys being the combination of OUTOUT_QUEUE_NAME and OUTPUT_QUEUE_LIBRARY_NAME
	// and the values being the number of times that combination appears.
	const outputQueueNameAndLibrary: Record<string, number> = {};
	foundUserDiagnostics.forEach(user => {
		const key = `${user.OUTPUT_QUEUE_NAME}/${user.OUTPUT_QUEUE_LIBRARY_NAME}`;
		if (outputQueueNameAndLibrary[key]) {
			outputQueueNameAndLibrary[key] += 1;
		} else {
			outputQueueNameAndLibrary[key] = 1;
		}
	});

	// Use the object to find the 3 most popular OUTOUT_QUEUE_NAME and OUTPUT_QUEUE_LIBRARY_NAME combinations.
	// Sort them by the number of times they appear.
	const outputQueueNameArray = Object.entries(outputQueueNameAndLibrary).sort(
		(a, b) => b[1] - a[1],
	);

	// Log a message listing the 3 most popular OUTOUT_QUEUE_NAME and OUTPUT_QUEUE_LIBRARY_NAME combinations,
	// and how many times they appear.
	console.log(chalk.yellow(`The most popular output queues are:`));
	for (let index = 0; index < 3; index += 1) {
		if (outputQueueNameArray[index]) {
			console.log(
				chalk.blue(
					`${outputQueueNameArray[index][0]} used by ${outputQueueNameArray[index][1]}`,
				),
			);
		}
	}

	// Find the last 5 users to sign on. Treat PREVIOUS_SIGNON as a Date.
	// If PREVIOUS_SIGNON is null, ignore them.
	// TODO: Make sure this actually works.
	const lastFiveUsersToSignOn = foundUserDiagnostics
		.filter(user => user.PREVIOUS_SIGNON !== null)
		.sort((a, b) => {
			const aDate = new Date(a.PREVIOUS_SIGNON);
			const bDate = new Date(b.PREVIOUS_SIGNON);
			return aDate.getTime() - bDate.getTime();
		})
		.slice(0, 5)
		.map(user => user.AUTHORIZATION_NAME);
	console.log(chalk.yellow(`The last 5 users to sign on are: `));
	console.log(chalk.blue(lastFiveUsersToSignOn.join(`, `)));
}
