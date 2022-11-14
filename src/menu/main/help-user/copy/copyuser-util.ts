/* eslint-disable func-style */
import chalk from 'chalk';
import type odbc from 'odbc';
import { qualifyObject } from '../../../../util.js';
import { queryOdbc } from '../../../../util/odbc/odbc-util.js';
import CHGOBJOWN from '../../../../util/qcmdexc/chgobjown.js';
import CHGUSRPRF from '../../../../util/qcmdexc/chgusrprf.js';
import CRTUSRPRF from '../../../../util/qcmdexc/crtusrprf.js';
import { parseErrorMessage } from '../../../../util/qcmdexc/qcmdexc-util.js';
import QCMDEXC from '../../../../util/qcmdexc/qcmdexc.js';
import {
	type IbmiUserInterface,
	type CreateUserInterface,
	type IbmiAuthorizationListInterface,
} from '../../../../util/types.js';
import { genericPasswordMenu, genericGetCommand } from '../../../generic/generic.js';
import confirm from '../../../generic/inquirer-confirm.js';
import select from '../../../generic/inquirer-select.js';

/* If possiblyNullValue is null or undefined, return an empty string.
Otherwise, return possiblyNullValue. */
// eslint-disable-next-line @typescript-eslint/ban-types
function notNull(possiblyNullValue: string | null | undefined): string {
	if (possiblyNullValue === null) {
		return ``;
	}

	if (typeof possiblyNullValue === `undefined`) {
		return ``;
	}

	if (typeof possiblyNullValue === `string`) {
		return possiblyNullValue; // Now definitely not null.
	}

	throw new Error(`Type unexpected`);
}

function convertUserInterface(
	copyUser: IbmiUserInterface,
	newUser: string,
	newDescription: string,
): CreateUserInterface {
	/* Setup user values for CRTUSRPRF. */
	const userId = newUser;
	const userText = newDescription;
	const userPassword = `*NONE`;
	const userClass = copyUser.USER_CLASS_NAME;
	const userInitialProgram = qualifyObject({
		library: copyUser.INITIAL_PROGRAM_LIBRARY_NAME,
		object: copyUser.INITIAL_PROGRAM_NAME,
	});
	const userInitialMenu = qualifyObject({
		library: copyUser.INITIAL_MENU_LIBRARY_NAME,
		object: copyUser.INITIAL_MENU_NAME,
	});
	let userLimitCapabilities: `*NO` | `*PARTIAL` | `*SAME` | `*YES` = `*YES`;
	switch (copyUser.LIMIT_CAPABILITIES) {
		case `*NO`:
			userLimitCapabilities = `*NO`;
			break;
		case `*PARTIAL`:
			userLimitCapabilities = `*PARTIAL`;
			break;
		case `*SAME`:
			userLimitCapabilities = `*SAME`;
			break;
		default:
	}

	const userSpecialAuthority = notNull(copyUser.SPECIAL_AUTHORITIES);
	const userJobDescription = qualifyObject({
		library: copyUser.JOB_DESCRIPTION_LIBRARY_NAME,
		object: copyUser.JOB_DESCRIPTION_NAME,
	});
	const userGroupProfile = copyUser.GROUP_PROFILE_NAME;
	const userGroupAuthority = copyUser.GROUP_AUTHORITY;
	const userAccountingCode = notNull(copyUser.ACCOUNTING_CODE);
	const userDelivery = copyUser.MESSAGE_QUEUE_DELIVERY_METHOD;
	const userOutqueue = qualifyObject({
		library: copyUser.OUTPUT_QUEUE_LIBRARY_NAME,
		object: copyUser.OUTPUT_QUEUE_NAME,
	});
	const userAttentionProgram = qualifyObject({
		library: copyUser.ATTENTION_KEY_HANDLING_PROGRAM_LIBRARY_NAME,
		object: copyUser.ATTENTION_KEY_HANDLING_PROGRAM_NAME,
	});
	const userSupplementalGroups = notNull(copyUser.SUPPLEMENTAL_GROUP_LIST);
	let userPasswordExpirationInterval;
	let userMaximumAllowedStorage;
	let userCharacterCodeSetId: number | '*HEX' | '*SAME' | '*SYSVAL';

	switch (copyUser.PASSWORD_EXPIRATION_INTERVAL) {
		case 0:
			userPasswordExpirationInterval = `*SYSVAL`;
			break;
		case -1:
			userPasswordExpirationInterval = `*NOMAX`;
			break;
		default:
			userPasswordExpirationInterval = copyUser.PASSWORD_EXPIRATION_INTERVAL.toString();
			break;
	}

	switch (copyUser.MAXIMUM_ALLOWED_STORAGE) {
		// TODO These values need to be confirmed.
		case BigInt(-1):
			userMaximumAllowedStorage = `*NOMAX`;
			break;
		default:
			// TODO This value needs to be confirmed.
			userMaximumAllowedStorage = copyUser.MAXIMUM_ALLOWED_STORAGE.toString();
	}

	switch (copyUser.CHARACTER_CODE_SET_ID) {
		// TODO These values need to be confirmed.
		case `-2`:
			userCharacterCodeSetId = `*SYSVAL`;
			break;
		case `QCCSID`:
			userCharacterCodeSetId = `*SYSVAL`;
			break;
		default:
			userCharacterCodeSetId = copyUser.CHARACTER_CODE_SET_ID;
	}

	return {
		userAccountingCode,
		userAttentionProgram,
		userCharacterCodeSetId,
		userClass,
		userDelivery,
		userGroupAuthority,
		userGroupProfile,
		userId,
		userInitialMenu,
		userInitialProgram,
		userJobDescription,
		userLimitCapabilities,
		userMaximumAllowedStorage,
		userOutqueue,
		userPassword,
		userPasswordExpirationInterval,
		userSpecialAuthority,
		userSupplementalGroups,
		userText,
	};
}

// ! Default export */
/* Copies an existing user and creates a new user with the same privileges. */

export default async (copyFromUser: string, newUser: string, userDescription: string) => {
	// ! Start now and await later.
	const fromUserRaw = queryOdbc(
		`SELECT * FROM QSYS2.USER_INFO WHERE AUTHORIZATION_NAME = '${copyFromUser.toUpperCase()}'`,
	);
	// Get the name of the system using SELECT RDB_NAME FROM QSYS2.ASP_INFO.
	const querySystemName = queryOdbc(`SELECT RDB_NAME FROM QSYS2.ASP_INFO`);
	/* If the result of query2 is not empty, then the new user already exists. */
	const query2 = queryOdbc(
		`SELECT AUTHORIZATION_NAME FROM QSYS2.USER_INFO_BASIC WHERE AUTHORIZATION_NAME = '${newUser.toUpperCase()}'`,
	);
	/* Check if the library object already exists. */
	const query3 = queryOdbc(`SELECT * FROM TABLE (QSYS2.OBJECT_STATISTICS('TEQ1', '*LIB')) AS X `);
	/* Check if fromUser exists on any authorization lists, then copy newUser to them. */
	/* This information is on the view AUTHORIZATION_LIST_USER_INFO. */
	const query6 = queryOdbc(
		`SELECT * FROM QSYS2.AUTHORIZATION_LIST_USER_INFO WHERE AUTHORIZATION_NAME = '${copyFromUser.toUpperCase()}'`,
	);

	// ! Start of awaits...
	/* Prompt for new password. */
	const newPassword = await genericPasswordMenu({
		clearPromptOnDone: false,
		mask: `*`,
		message: `Enter new password for ${newUser}:`,
	});
	// Deconstruct the object
	// eslint-disable-next-line unicorn/no-await-expression-member
	const fromUser: IbmiUserInterface = (await fromUserRaw)[0] as unknown as IbmiUserInterface;
	/* If the result of query is empty, then the user does not exist. */
	// eslint-disable-next-line unicorn/no-await-expression-member
	if ((await fromUserRaw).length === 0) {
		const confirmPrompt = await confirm({
			message: `User ${copyFromUser} does not exist. Would you like to use the default user profile?`,
		});
		if (confirmPrompt) {
			// TODO Search for default user profile.
			// TODO Create user with default user profile.
		}

		console.error(`User ${copyFromUser} does not exist.`);
		return `User ${copyFromUser} does not exist.`;
	}

	const toUser: CreateUserInterface = convertUserInterface(
		fromUser,
		newUser.toUpperCase(),
		userDescription,
	);
	toUser.userPassword = newPassword;

	/* If the result of query2 is not empty, then the new user already exists. */
	// eslint-disable-next-line unicorn/no-await-expression-member
	if ((await query2).length > 0) {
		console.error(`User ${newUser} already exists.`);
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
		console.error(`User ${copyFromUser} is not copyable.`);
		return `User ${copyFromUser} is not copyable.`;
	}

	/* If the result of query3 is empty, then the library does not exist. */
	// eslint-disable-next-line unicorn/no-await-expression-member
	if ((await query3).length === 0) {
		console.error(`Library TEQ1 does not exist.`);
		return `Library TEQ1 does not exist.`;
	}

	// TODO Prompt for new password, initial program, limit capabilties,
	// TODO text description, special authorities, and outqueue.
	// TODO Prompt to provide Email.

	let changeAttributesBoo = true;
	let choicesObject: Array<{ value: string }> = [
		{ value: `Continue` },
		{ value: `Outqueue            : ${chalk.bgBlue.whiteBright(toUser.userOutqueue)}` },
		{ value: `Initial Program     : ${chalk.bgBlue.whiteBright(toUser.userInitialProgram)}` },
		{ value: `Text Description    : ${chalk.bgBlue.whiteBright(toUser.userText)}` },
		// eslint-disable-next-line prettier/prettier
		{ value: `Limit Capabilities  : ${chalk.bgBlue.whiteBright(toUser.userLimitCapabilities)}` },
		{ value: `Special Authorities : ${chalk.bgBlue.whiteBright(toUser.userSpecialAuthority)}` },
	];

	while (changeAttributesBoo)
		/* Create an inquirer prompt that has options for initial program, limit capabilities, 
	text description, special authorities, and outqueue. */
		// eslint-disable-next-line no-await-in-loop
		await select({
			choices: choicesObject,
			message: `Change any user profile attributes?`,
		})
			// eslint-disable-next-line @typescript-eslint/no-loop-func
			.then(async answers => {
				switch (answers) {
					case `Initial Program     : ${chalk.bgBlue.whiteBright(
						toUser.userInitialProgram,
					)}`: {
						await genericGetCommand({
							default: toUser.userInitialProgram,
							message: `Enter new initial program for ${newUser}:`,
						})
							// eslint-disable-next-line @typescript-eslint/no-shadow
							.then(async answers => {
								toUser.userInitialProgram = answers;
							});
						break;
					}

					case `Limit Capabilities  : ${chalk.bgBlue.whiteBright(
						toUser.userLimitCapabilities,
					)}`: {
						await genericGetCommand({
							default: toUser.userLimitCapabilities,
							message: `Enter new limit capabilities for ${newUser}:`,
						})
							// eslint-disable-next-line @typescript-eslint/no-shadow
							.then(async answers => {
								// eslint-disable-next-line max-len
								// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
								toUser.userLimitCapabilities = answers as any;
							});

						break;
					}

					case `Text Description    : ${chalk.bgBlue.whiteBright(toUser.userText)}`: {
						await genericGetCommand({
							default: toUser.userText,
							message: `Enter new text description for ${newUser}:`,
						})
							// eslint-disable-next-line @typescript-eslint/no-shadow
							.then(async answers => {
								toUser.userText = answers;
							});
						break;
					}

					case `Special Authorities : ${chalk.bgBlue.whiteBright(
						toUser.userSpecialAuthority,
					)}`: {
						await genericGetCommand({
							default: toUser.userSpecialAuthority,
							message: `Enter new special authorities for ${newUser}:`,
						})
							// eslint-disable-next-line @typescript-eslint/no-shadow
							.then(async answers => {
								toUser.userSpecialAuthority = answers;
							});

						break;
					}

					case `Outqueue            : ${chalk.bgBlue.whiteBright(toUser.userOutqueue)}`: {
						await genericGetCommand({
							default: toUser.userOutqueue,
							message: `Enter new outqueue for ${newUser}:`,
						})
							// eslint-disable-next-line @typescript-eslint/no-shadow
							.then(async answers => {
								toUser.userOutqueue = answers;
							});
						break;
					}

					default: {
						changeAttributesBoo = false;
					}
				}

				choicesObject = [
					{ value: `Continue` },
					// eslint-disable-next-line prettier/prettier
					{ value: `Outqueue            : ${chalk.bgBlue.whiteBright(toUser.userOutqueue)}` },
					// eslint-disable-next-line prettier/prettier
					{ value: `Initial Program     : ${chalk.bgBlue.whiteBright(toUser.userInitialProgram)}` },
					{ value: `Text Description    : ${chalk.bgBlue.whiteBright(toUser.userText)}` },
					// eslint-disable-next-line prettier/prettier
					{ value: `Limit Capabilities  : ${chalk.bgBlue.whiteBright(toUser.userLimitCapabilities)}` },
					// eslint-disable-next-line prettier/prettier
					{ value: `Special Authorities : ${chalk.bgBlue.whiteBright(toUser.userSpecialAuthority)}` },
				];
			});

	/* Assemble the user variables into a string using template literals. */
	await QCMDEXC(CRTUSRPRF(toUser)).catch(async (error: odbc.NodeOdbcError) => {
		const parseError = await parseErrorMessage(error);
		throw new Error(`${parseError.errorIdentifier}: ${parseError.messageText}`);
	});

	const query5 = await queryOdbc(
		`SELECT AUTHORIZATION_NAME FROM QSYS2.USER_INFO_BASIC WHERE AUTHORIZATION_NAME = '${newUser.toUpperCase()}'`,
	);
	/* If the result of query4 is empty, then the user failed to create. */
	if (query5.length === 0) {
		console.error(`User ${newUser} failed to create.`);
		return `User ${newUser} failed to create.`;
	} else {
		console.log(`User ${newUser} created.`);
	}

	const AdjustUserParameters = QCMDEXC(
		CHGUSRPRF({
			CCSID: toUser.userCharacterCodeSetId,
			MAXSTG: toUser.userMaximumAllowedStorage,
			PWDEXP: `*YES`,
			PWDEXPITV: toUser.userPasswordExpirationInterval,
			USRPRF: toUser.userId,
		}),
		// eslint-disable-next-line promise/prefer-await-to-then
	).catch(async (error: odbc.NodeOdbcError) => {
		console.log(
			CHGUSRPRF({
				CCSID: toUser.userCharacterCodeSetId,
				MAXSTG: toUser.userMaximumAllowedStorage,
				PWDEXP: `*YES`,
				PWDEXPITV: toUser.userPasswordExpirationInterval,
				USRPRF: toUser.userId,
			}),
		);
		const parseError = await parseErrorMessage(error);
		throw new Error(`${parseError.errorIdentifier}: ${parseError.messageText}`);
	});

	/* Change object owner to QSECOFR. */
	const ChangeObjectOwner = QCMDEXC(CHGOBJOWN(newUser.toUpperCase()));
	/* If the result of query6 is empty, then the user does not exist on any authorization lists. */
	const AuthorizationListPromises: Array<Promise<unknown>> = [];
	// eslint-disable-next-line unicorn/no-await-expression-member
	if ((await query6).length === 0) {
		console.log(`User ${copyFromUser} does not exist on any authorization lists.`);
	} else {
		/* Copy newUser to all authorization lists that fromUser is on. */
		// eslint-disable-next-line unicorn/no-await-expression-member
		(await query6).forEach(async element => {
			const thing = element as unknown as IbmiAuthorizationListInterface;
			// Push the promise to the array
			const AddAuthorizationList = QCMDEXC(
				`ADDAUTLE AUTL(${thing.AUTHORIZATION_LIST}) USER(${newUser.toUpperCase()}) AUT(${
					thing.OBJECT_AUTHORITY
				})`,
				// eslint-disable-next-line promise/prefer-await-to-then
			).catch(async (error: odbc.NodeOdbcError) => {
				const parseError = await parseErrorMessage(error);
				if (parseError.errorIdentifier === `CPF2282`) {
					// If the user already exists on the authorization list, do nothing.
					console.error(
						chalk.yellow.bgBlack(
							`${parseError.errorIdentifier}: ${parseError.messageText} ${thing.AUTHORIZATION_LIST}`,
						),
					);
					return 0;
				}

				// Otherwise, throw an error.
				throw new Error(`${parseError.errorIdentifier}: ${parseError.messageText}`);
			});
			AuthorizationListPromises.push(AddAuthorizationList);
		});
	}

	// Get the name of the system using SELECT RDB_NAME FROM QSYS2.ASP_INFO.
	// eslint-disable-next-line unicorn/no-await-expression-member
	const RDB_NAME = Object.values((await querySystemName)[0])[0];
	/* Create a directory entry for the new user. */
	const CreateDirectoryEntry = QCMDEXC(
		`ADDDIRE USRID(${newUser.toUpperCase().slice(0, 7)} ${RDB_NAME}) USRD(''${
			toUser.userText
		}'') USER(${newUser.toUpperCase()})`,
		// eslint-disable-next-line promise/prefer-await-to-then
	).catch(async (error: odbc.NodeOdbcError) => {
		const parseError = await parseErrorMessage(error);
		if (parseError.errorIdentifier === `CPF9082`) {
			// If the user already exists on the directory list, do nothing.
			console.error(
				chalk.yellow.bgBlack(`${parseError.errorIdentifier}: ${parseError.messageText}`),
			);
			return 0;
		}

		// Otherwise, throw an error.
		throw new Error(`${parseError.errorIdentifier}: ${parseError.messageText}`);
	});

	// ! Resolve remaining promises.
	await Promise.all([AdjustUserParameters, ChangeObjectOwner, CreateDirectoryEntry]);
	await Promise.all(AuthorizationListPromises);

	return `Successfully completed user creation, added to authorization lists, and added to directory.`;
};
