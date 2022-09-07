import inquirer from 'inquirer';
import { queryOdbc, cmdOdbc } from './odbc-util.js';
import {
	type IbmiUserInterface,
	type CreateUserInterface,
	type IbmiAuthorizationListInterface} from './types.js';
import { convertUserInterface } from './util.js';

/* Assemble the user variables into a string using template literals. */
function CHGUSRPRF(
	userIdCHGUSRPRF: string,
	userPasswordExpirationIntervalCHGUSRPRF: string,
	userMaximumAllowedStorageCHGUSRPRF: string,
	userCharacterCodeSetIdCHGUSRPRF: string,
) {
	const qcmdexc = `CHGUSRPRF \
USRPRF(${userIdCHGUSRPRF}) \
PWDEXP(*YES) \
PWDINT(${userPasswordExpirationIntervalCHGUSRPRF}) \
MAXSTG(${userMaximumAllowedStorageCHGUSRPRF}) \
CCSID(${userCharacterCodeSetIdCHGUSRPRF})`;
	return qcmdexc;
}

function CHGOBJOWN(newUser: string) {
	const qcmdexc = `CHGOBJOWN \
OBJ(QSYS/${newUser}) \
OBJTYPE(*USRPRF) \
NEWOWN(QSECOFR)`;
	return qcmdexc;
}

function CRTUSRPRF(toUser: CreateUserInterface) {
	return `CRTUSRPRF \
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
}

/* Copies an existing user and creates a new user with the same privileges. */

export default async (copyFromUser: string, newUser: string, userDescription: string) => {
	const fromUserRaw = await queryOdbc(
		`SELECT * FROM QSYS2.USER_INFO WHERE AUTHORIZATION_NAME = '${copyFromUser}'`,
	);
	// Deconstruct the object
	const fromUser: IbmiUserInterface = fromUserRaw[0] as unknown as IbmiUserInterface;
	/* If the result of query is empty, then the user does not exist. */
	if (fromUserRaw.length === 0) {
		const confirmPrompt = inquirer.prompt([
			{
				message: `User ${copyFromUser} does not exist. Would you like to use the default user profile?`,
				name: `confirm`,
				type: `confirm`,
			},
		]);
		const confirmAnswer = (await confirmPrompt) as { confirm: boolean };
		if (confirmAnswer.confirm) {
			// TODO Search for default user profile.
			// TODO Create user with default user profile.
		}

		console.log(`User ${copyFromUser} does not exist.`);
		return `User ${copyFromUser} does not exist.`;
	}

	const toUser: CreateUserInterface = convertUserInterface(fromUser, newUser, userDescription);

	const query2 = await queryOdbc(
		`SELECT * FROM QSYS2.USER_INFO_BASIC WHERE AUTHORIZATION_NAME = '${newUser}'`,
	);
	/* If the result of query2 is not empty, then the new user already exists. */
	if (query2.length > 0) {
		console.log(`User ${newUser} already exists.`);
		/*
		void inquirer
			.prompt([
				{
					message: `User ${newUser} already exists. Do you want to overwrite it?`,
					name: `confirm`,
					type: `confirm`,
				},
			])
			.then(async answers => {
				if (answers.confirm) {
					await queryOdbc(`DROP USER ${newUser}`);
					await queryOdbc(CRTUSRPRF(toUser));
					await queryOdbc(
						CHGUSRPRF(
							newUser,
							toUser.userPasswordExpirationInterval,
							toUser.userMaximumAllowedStorage,
							toUser.userCharacterCodeSetId,
						),
					);
					await queryOdbc(CHGOBJOWN(newUser));
					console.log(`User ${newUser} has been created.`);
				} else {
					console.log(`User ${newUser} has not been created.`);
				}
			});
*/
		return `User ${newUser} already exists.`;
	}

	/* If their accounting code is NOCOPY, don't copy this user. */
	if (fromUser.ACCOUNTING_CODE === `NOCOPY`) {
		console.log(`User ${copyFromUser} is not copyable.`);
		return `User ${copyFromUser} is not copyable.`;
	}

	/* Check if the library object already exists. */
	const query3 = await queryOdbc(
		`SELECT * FROM TABLE (QSYS2.OBJECT_STATISTICS('TEQ1', '*LIB')) AS X `,
	);
	/* If the result of query3 is empty, then the library does not exist. */
	if (query3.length === 0) {
		console.log(`Library TEQ1 does not exist.`);
		return `Library TEQ1 does not exist.`;
	}

	/* Assemble the user variables into a string using template literals. */
	try {
		console.log(CRTUSRPRF(toUser));
		// TODO await cmdOdbc(CRTUSRPRF(toUser));
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(`User ${newUser} could not be created.`);
			console.log(error.message);
			return `User ${newUser} could not be created.`;
		}

		console.log(error);
		return error;
	}

	const query5 = await queryOdbc(
		`SELECT * FROM QSYS2.USER_INFO_BASIC WHERE AUTHORIZATION_NAME = '${newUser}'`,
	);
	/* If the result of query4 is empty, then the user does not exist. */
	if (query5.length === 0) {
		console.log(`User ${newUser} failed to create.`);
		// return `User ${newUser} failed to create.`;
		// TODO Leave this function and do something else.
	}

	console.log(`User ${newUser} created.`);

	try {
		console.log(
			CHGUSRPRF(
				toUser.userId,
				toUser.userPasswordExpirationInterval,
				toUser.userMaximumAllowedStorage,
				toUser.userCharacterCodeSetId,
			),
		);
		/* TODO await cmdOdbc(CHGUSRPRF(
		toUser.userId,
		toUser.userPasswordExpirationInterval,
		toUser.userMaximumAllowedStorage,
		toUser.userCharacterCodeSetId,
	)); */
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(error.message);
			return error.message;
		}

		console.log(error);
		return error;
	}

	/* Change object owner to QSECOFR. */
	console.log(CHGOBJOWN(newUser));
	// TODO await cmdOdbc(CHGOBJOWN(newUser));
	/* Check if fromUser exists on any authorization lists, then copy newUser to them. */
	/* This information is on the view AUTHORIZATION_LIST_USER_INFO. */
	const query6 = await queryOdbc(
		`SELECT * FROM QSYS2.AUTHORIZATION_LIST_USER_INFO WHERE AUTHORIZATION_NAME = '${copyFromUser}'`,
	);
	console.log(query6[0]);
	/* If the result of query6 is empty, then the user does not exist on any authorization lists. */
	if (query6.length === 0) {
		console.log(`User ${copyFromUser} does not exist on any authorization lists.`);
	} else {
		/* Copy newUser to all authorization lists that fromUser is on. */
		query6.forEach(async element => {
			const thing = element as unknown as IbmiAuthorizationListInterface;
			console.log(
				`ADDAUTLE AUTL(${thing.AUTHORIZATION_LIST}) USER(${newUser}) AUT(${thing.OBJECT_AUTHORITY})`,
			);
			/* await cmdOdbc(
				`ADDAUTLE AUTL(${thing.AUTHORIZATION_LIST}) USER(${newUser}) AUT(${thing.OBJECT_AUTHORITY})`,
			); */
		});
	}

	return `Success`;
};
