import { cmdOdbc, queryOdbc } from './odbc-util.js';
import { type IbmiUserInterface, type CreateUserInterface } from './types.js';
import { convertUserInterface } from './util.js';

/* Copies an existing user and creates a new user with the same privileges. */

export default async (copyFromUser: string, newUser: string, userDescription: string) => {
	const fromUserRaw = await queryOdbc(
		`SELECT * FROM QSYS2.USER_INFO WHERE AUTHORIZATION_NAME = '${copyFromUser}'`,
	);
	// Deconstruct the object
	const fromUser: IbmiUserInterface = fromUserRaw[0] as unknown as IbmiUserInterface;
	const toUser: CreateUserInterface = convertUserInterface(fromUser, newUser, userDescription);

	/* If the result of query is empty, then the user does not exist. */
	if (fromUserRaw.length === 0) {
		console.log(`User ${copyFromUser} does not exist.`);
		return;
	}

	const query2 = await queryOdbc(
		`SELECT * FROM QSYS2.USER_INFO_BASIC WHERE AUTHORIZATION_NAME = '${newUser}'`,
	);
	/* If the result of query2 is not empty, then the new user already exists. */
	if (query2.length > 0) {
		console.log(`User ${newUser} already exists.`);
		return;
	}

	/* If their accounting code is NOCOPY, don't copy this user. */
	if (fromUser.ACCOUNTING_CODE === `NOCOPY`) {
		console.log(`User ${copyFromUser} is not copyable.`);
		return;
	}

	/* Check if the library object already exists. */
	const query3 = await queryOdbc(
		`SELECT * FROM TABLE (QSYS2.OBJECT_STATISTICS('TEQ1', '*LIB')) AS X `,
	);
	/* If the result of query3 is empty, then the library does not exist. */
	if (query3.length === 0) {
		console.log(`Library TEQ1 does not exist.`);
		return;
	}

	/* Assemble the user variables into a string using template literals. */
	let qcmdexc = `CRTUSRPRF \
USRPRF(${toUser.userId}) \
STATUS(*ENABLED) \
PASSWORD(${toUser.userPassword}) \
PWDEXP(*YES) \
USRCLS(${toUser.userClass}) \
INLPGM(${toUser.userInitialProgram}) \
INLMNU(${toUser.userInitialMenu}) \
LMTCPB(${toUser.userLimitCapabilities}) \
TEXT(${toUser.userText}) \
SPCAUT(${toUser.userSpecialAuthority}) \
JOBD(${toUser.userJobDescription}) \
GRPPRF(${toUser.userGroupProfile}) \
GRPAUT(${toUser.userGroupAuthority}) \
ACGCDE(${toUser.userAccountingCode}) \
DLVRY(${toUser.userDelivery}) \
OUTQ(${toUser.userOutqueue}) \
ATNPGM(${toUser.userAttentionProgram}) \
SUPGRPPRF(${toUser.userSupplementalGroups})`;
	// ! TEXT param needs to cancel apostrophes.
	// TODO Remove undefined values.
	try {
		console.log(qcmdexc);
		// TODO await cmdOdbc(qcmdexc);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log(error);
		}
	}

	const query5 = await queryOdbc(
		`SELECT * FROM QSYS2.USER_INFO_BASIC WHERE AUTHORIZATION_NAME = '${newUser}'`,
	);
	/* If the result of query4 is empty, then the user does not exist. */
	if (query5.length === 0) {
		console.log(`User ${newUser} failed to create.`);
		// TODO Leave this function and do something else.
	} else {
		console.log(`User ${newUser} created.`);
	}

	let userPasswordExpirationInterval;
	let userMaximumAllowedStorage;
	let userCharacterCodeSetId;

	switch (fromUser.PASSWORD_EXPIRATION_INTERVAL) {
		case 0:
			userPasswordExpirationInterval = `*SYSVAL`;
			break;
		case -1:
			userPasswordExpirationInterval = `*NOMAX`;
			break;
		default:
			userPasswordExpirationInterval = fromUser.PASSWORD_EXPIRATION_INTERVAL;
			break;
	}

	switch (fromUser.MAXIMUM_ALLOWED_STORAGE) {
		// TODO These values need to be confirmed.
		case BigInt(-1):
			userMaximumAllowedStorage = `*NOMAX`;
			break;
		default:
			userMaximumAllowedStorage = fromUser.MAXIMUM_ALLOWED_STORAGE;
	}

	switch (fromUser.CHARACTER_CODE_SET_ID) {
		// TODO These values need to be confirmed.
		case `-2`:
			userCharacterCodeSetId = `*SYSVAL`;
			break;
		default:
			userCharacterCodeSetId = fromUser.CHARACTER_CODE_SET_ID;
	}

	/* Assemble the user variables into a string using template literals. */
	qcmdexc = `CHGUSRPRF \
USRPRF(${newUser}) \
PWDEXP(*YES) \
PWDEXPITV(${userPasswordExpirationInterval}) \
MAXSTG(${userMaximumAllowedStorage}) \
CCSID(${userCharacterCodeSetId})`;
	try {
		console.log(qcmdexc);
		// TODO await cmdOdbc(qcmdexc);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log(error);
		}
		// TODO Leave this function and do something else.
	}

	/* Change object owner to QSECOFR. */
	qcmdexc = `CHGOBJOWN \
OBJ(QSYS/${newUser}) \
OBJTYPE(*USRPRF) \
NEWOWN(QSECOFR)`;
	console.log(qcmdexc);
	// TODO await cmdOdbc(qcmdexc);
	/* Check if fromUser exists on any authorization lists, then copy newUser to them. */
	/* This information is on the view AUTHORIZATION_LIST_USER_INFO. */
	const query6 = await queryOdbc(
		`SELECT * FROM QSYS2.AUTHORIZATION_LIST_USER_INFO WHERE AUTHORIZATION_NAME = '${copyFromUser}'`,
	);
	console.log(query6[0]);
};
