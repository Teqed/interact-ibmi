import { queryOdbc } from './odbc-util.js';
import { type BriefIbmiUserInterface } from './types.js';

// eslint-disable-next-line import/prefer-default-export
export async function diagnoseUsers() {
	const sqlqry = `
SELECT ACCOUNTING_CODE, AUTHORIZATION_NAME, DATE_PASSWORD_EXPIRES, DAYS_UNTIL_PASSWORD_EXPIRES, 
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
}
