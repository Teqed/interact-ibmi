import { queryOdbc } from './odbc-util.js';
import { type BriefIbmiUserInterface } from './types.js';

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
		console.log(`The following users are disabled: ${usersDiabled.join(`, `)}`);
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
		console.log(`The following users are expired: ${usersExpired.join(`, `)}`);
	}

	// Create an array of user ids that are NETSERVER_DISABLED.
	const usersNetServerDisabled = foundUserDiagnostics
		.filter(user => user.NETSERVER_DISABLED === `YES`)
		.map(user => user.AUTHORIZATION_NAME);

	// If there are any users NETSERVER_DISABLED, log a message listing their names.
	if (usersNetServerDisabled.length > 0) {
		console.log(
			`The following users are NETSERVER_DISABLED: ${usersNetServerDisabled.join(`, `)}`,
		);
	}

	// Find the 3 most popular combination of values for users.INITIAL_PROGRAM_NAME
	// and users.INITIAL_PROGRAM_LIBRARY_NAME on foundUserDiagnostics.
	const initialProgramNamePopularAndLibrary = foundUserDiagnostics
		.map(user => [user.INITIAL_PROGRAM_NAME, user.INITIAL_PROGRAM_LIBRARY_NAME])
		.filter(
			initialProgramName => initialProgramName[0] !== null && initialProgramName[1] !== null,
		)
		// eslint-disable-next-line unicorn/no-array-reduce
		.reduce((accumulator, initialProgramName) => {
			if (accumulator.has(initialProgramName)) {
				// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
				accumulator.set(initialProgramName, accumulator.get(initialProgramName) + 1);
			} else {
				accumulator.set(initialProgramName, 1);
			}

			return accumulator;
		}, new Map());
	console.log(`The most popular initial programs are: `);
	initialProgramNamePopularAndLibrary.forEach((count, initialProgramName) => {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		console.log(`${initialProgramName[1]}/${initialProgramName[0]} used by ${count}`);
	});
}
