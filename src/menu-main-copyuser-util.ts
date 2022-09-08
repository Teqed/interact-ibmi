import inquirer from 'inquirer';
import type odbc from 'odbc';
import chalk from 'chalk';
import { CRTUSRPRF, CHGUSRPRF, CHGOBJOWN, parseErrorMessage } from './qcmdexc-util.js';
import { cmdOdbc, queryOdbc } from './odbc-util.js';
import {
	type IbmiUserInterface,
	type CreateUserInterface,
	type IbmiAuthorizationListInterface,
} from './types.js';
import { convertUserInterface } from './util.js';

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

	// TODO Prompt for new password, initial program, limit capabilties,
	// TODO text description, special authorities, and outqueue.
	// TODO Prompt to provide Email.

	/* Assemble the user variables into a string using template literals. */
	await cmdOdbc(CRTUSRPRF(toUser)).catch(async (error: odbc.NodeOdbcError) => {
		const parseError = await parseErrorMessage(error);
		console.log(chalk.red.bgBlack(`${parseError.errorNumber}: ${parseError.errorMessage}`));
		// throw new Error(`${parseError.errorNumber}: ${parseError.errorMessage}`);
		// TODO Leave this function and do something else.
	});

	const query5 = await queryOdbc(
		`SELECT * FROM QSYS2.USER_INFO_BASIC WHERE AUTHORIZATION_NAME = '${newUser}'`,
	);
	/* If the result of query4 is empty, then the user failed to create. */
	if (query5.length === 0) {
		console.log(`User ${newUser} failed to create.`);
		// return `User ${newUser} failed to create.`;
		// TODO Leave this function and do something else.
	}

	console.log(`User ${newUser} created.`);

	console.log(
		CHGUSRPRF(
			toUser.userId,
			toUser.userPasswordExpirationInterval,
			toUser.userMaximumAllowedStorage,
			toUser.userCharacterCodeSetId,
		),
	);
	await cmdOdbc(
		CHGUSRPRF(
			toUser.userId,
			toUser.userPasswordExpirationInterval,
			toUser.userMaximumAllowedStorage,
			toUser.userCharacterCodeSetId,
		),
	).catch(async (error: odbc.NodeOdbcError) => {
		const parseError = await parseErrorMessage(error);
		console.log(chalk.red.bgBlack(`${parseError.errorNumber}: ${parseError.errorMessage}`));
		// throw new Error(`${parseError.errorNumber}: ${parseError.errorMessage}`);
		// TODO Leave this function and do something else.
	});

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
			await cmdOdbc(
				`ADDAUTLE AUTL(${thing.AUTHORIZATION_LIST}) USER(${newUser}) AUT(${thing.OBJECT_AUTHORITY})`,
			).catch(async (error: odbc.NodeOdbcError) => {
				const parseError = await parseErrorMessage(error);
				if (parseError.errorNumber === `CPF2282`) {
					// If the user already exists on the authorization list, do nothing.
					console.log(
						chalk.yellow.bgBlack(
							`${parseError.errorNumber}: ${parseError.errorMessage} ${thing.AUTHORIZATION_LIST}`,
						),
					);
					return 0;
				}
				// Otherwise, throw an error.

				console.log(
					chalk.red.bgBlack(`${parseError.errorNumber}: ${parseError.errorMessage}`),
				);
				throw new Error(`${parseError.errorNumber}: ${parseError.errorMessage}`);
			});
		});
	}

	// Get the name of the system using SELECT RDB_NAME FROM QSYS2.ASP_INFO.
	const querySystemName = await queryOdbc(`SELECT RDB_NAME FROM QSYS2.ASP_INFO`);
	const RDB_NAME = Object.values(querySystemName[0])[0];
	/* Create a directory entry for the new user. */
	console.log(
		`ADDDIRE USRID(${newUser.slice(0, 7)} ${RDB_NAME}) USRD(${
			toUser.userText
		}) USER(${newUser})`,
	);
	await cmdOdbc(
		`ADDDIRE USRID(${newUser.slice(0, 7)} ${RDB_NAME}) USRD(${
			toUser.userText
		}) USER(${newUser})`,
	).catch(async (error: odbc.NodeOdbcError) => {
		const parseError = await parseErrorMessage(error);
		if (parseError.errorNumber === `CPF9082`) {
			// If the user already exists on the directory list, do nothing.
			console.log(
				chalk.yellow.bgBlack(`${parseError.errorNumber}: ${parseError.errorMessage}`),
			);
			return 0;
		}
		// Otherwise, throw an error.

		console.log(chalk.red.bgBlack(`${parseError.errorNumber}: ${parseError.errorMessage}`));
		throw new Error(`${parseError.errorNumber}: ${parseError.errorMessage}`);
	});

	return `Success`;
};
