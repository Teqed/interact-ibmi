import { type BriefIbmiUserInterface } from '../types.js';
import { sequelize } from './connection.js';
import {
	type USER_INFO_BASIC,
	type USER_INFO_BASICOptionalAttributes,
} from './models/USER_INFO_BASIC.js';

// eslint-disable-next-line import/no-mutable-exports
export let foundUsers: BriefIbmiUserInterface[];

// const sqlqry = ` FROM QSYS2.USER_INFO_BASIC`;

export default async function () {
	const includeArray: USER_INFO_BASICOptionalAttributes[] = [
		`ACCOUNTING_CODE`,
		`AUTHORIZATION_NAME`,
		`DAYS_UNTIL_PASSWORD_EXPIRES`,
		`INITIAL_MENU_LIBRARY_NAME`,
		`INITIAL_MENU_NAME`,
		`INITIAL_PROGRAM_LIBRARY_NAME`,
		`INITIAL_PROGRAM_NAME`,
		`LIMIT_CAPABILITIES`,
		`MESSAGE_QUEUE_DELIVERY_METHOD`,
		`MESSAGE_QUEUE_LIBRARY_NAME`,
		`MESSAGE_QUEUE_NAME`,
		`MESSAGE_QUEUE_SEVERITY`,
		`NETSERVER_DISABLED`,
		`NO_PASSWORD_INDICATOR`,
		`OBJECT_AUDITING_VALUE`,
		`OUTPUT_QUEUE_LIBRARY_NAME`,
		`OUTPUT_QUEUE_NAME`,
		`PASSWORD_CHANGE_DATE`,
		`PASSWORD_EXPIRATION_INTERVAL`,
		`PREVIOUS_SIGNON`,
		`SET_PASSWORD_TO_EXPIRE`,
		`SIGN_ON_ATTEMPTS_NOT_VALID`,
		`SPECIAL_AUTHORITIES`,
		`STATUS`,
		`TEXT_DESCRIPTION`,
		`USER_DEFAULT_PASSWORD`,
		`USER_EXPIRATION_INTERVAL`,
		`USER_ID_NUMBER`,
	];

	const query = await sequelize.models.USER_INFO_BASIC.findAll({
		attributes: {
			include: includeArray,
		},
		type: `SELECT`,
		// where: {
		// ACCOUNTING_CODE: ``,
		// } as USER_INFO_BASICAttributes,
	});
	// Create an array of objects by mapping the query results
	const query2 = query.map(user => {
		const user1 = user.get() as unknown as USER_INFO_BASIC;
		return user1;
	});
	foundUsers = query2 as unknown as BriefIbmiUserInterface[];

	return query2;
}
