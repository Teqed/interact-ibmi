import inquirer from 'inquirer';
import type odbc from 'odbc';
import chalk from 'chalk';
import { CRTUSRPRF, CHGUSRPRF, CHGOBJOWN, parseErrorMessage } from '../../qcmdexc-util.js';
import { cmdOdbc, queryOdbc } from '../../odbc-util.js';
import {
	type IbmiUserInterface,
	type CreateUserInterface,
	type IbmiAuthorizationListInterface,
} from '../../types.js';
import { convertUserInterface } from '../../util.js';

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

		console.error(`User ${copyFromUser} does not exist.`);
		return `User ${copyFromUser} does not exist.`;
	}

	const toUser: CreateUserInterface = convertUserInterface(fromUser, newUser, userDescription);

	const query2 = await queryOdbc(
		`SELECT * FROM QSYS2.USER_INFO_BASIC WHERE AUTHORIZATION_NAME = '${newUser}'`,
	);
	/* If the result of query2 is not empty, then the new user already exists. */
	if (query2.length > 0) {
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

	/* Check if the library object already exists. */
	const query3 = await queryOdbc(
		`SELECT * FROM TABLE (QSYS2.OBJECT_STATISTICS('TEQ1', '*LIB')) AS X `,
	);
	/* If the result of query3 is empty, then the library does not exist. */
	if (query3.length === 0) {
		console.error(`Library TEQ1 does not exist.`);
		return `Library TEQ1 does not exist.`;
	}

	// TODO Prompt for new password, initial program, limit capabilties,
	// TODO text description, special authorities, and outqueue.
	// TODO Prompt to provide Email.

	/* Prompt for new password. */
	await inquirer
		.prompt([
			{
				message: `Enter new password for ${newUser}:`,
				name: `newPassword`,
				type: `password`,
			},
		])
		.then(async answers => {
			toUser.userPassword = answers.newPassword as string;
		});
	let changeAttributesBoo = true;
	while (changeAttributesBoo)
		/* Create an inquirer prompt that has options for initial program, limit capabilities, 
	text description, special authorities, and outqueue. */
		// eslint-disable-next-line no-await-in-loop
		await inquirer
			.prompt([
				{
					choices: [
						`Continue`,
						`Initial Program ${toUser.userInitialProgram}`,
						`Limit Capabilities ${toUser.userLimitCapabilities}`,
						`Text Description ${toUser.userText}`,
						`Special Authorities ${toUser.userSpecialAuthority}`,
						`Outqueue ${toUser.userOutqueue}`,
					],
					message: `Change any user profile attributes?`,
					name: `changeAttributes`,
					type: `list`,
				},
			])
			// eslint-disable-next-line @typescript-eslint/no-loop-func
			.then(async answers => {
				const changeAttributes = answers.changeAttributes as string;
				switch (changeAttributes) {
					case `Initial Program ${toUser.userInitialProgram}`: {
						await inquirer
							.prompt([
								{
									default: toUser.userInitialProgram,
									message: `Enter new initial program for ${newUser}:`,
									name: `newInitialProgram`,
									type: `input`,
								},
							])
							// eslint-disable-next-line @typescript-eslint/no-shadow
							.then(async answers => {
								toUser.userInitialProgram = answers.newInitialProgram as string;
							});
						break;
					}

					case `Limit Capabilities ${toUser.userLimitCapabilities}`: {
						await inquirer
							.prompt([
								{
									default: toUser.userLimitCapabilities,
									message: `Enter new limit capabilities for ${newUser}:`,
									name: `newLimitCapabilities`,
									type: `input`,
								},
							])
							// eslint-disable-next-line @typescript-eslint/no-shadow
							.then(async answers => {
								toUser.userLimitCapabilities =
									answers.newLimitCapabilities as string;
							});

						break;
					}

					case `Text Description ${toUser.userText}`: {
						await inquirer
							.prompt([
								{
									default: toUser.userText,
									message: `Enter new text description for ${newUser}:`,
									name: `newTextDescription`,
									type: `input`,
								},
							])
							// eslint-disable-next-line @typescript-eslint/no-shadow
							.then(async answers => {
								toUser.userText = answers.newTextDescription as string;
							});
						break;
					}

					case `Special Authorities ${toUser.userSpecialAuthority}`: {
						await inquirer
							.prompt([
								{
									default: toUser.userSpecialAuthority,
									message: `Enter new special authorities for ${newUser}:`,
									name: `newSpecialAuthorities`,
									type: `input`,
								},
							])
							// eslint-disable-next-line @typescript-eslint/no-shadow
							.then(async answers => {
								toUser.userSpecialAuthority =
									answers.newSpecialAuthorities as string;
							});

						break;
					}

					case `Outqueue ${toUser.userOutqueue}`: {
						await inquirer
							.prompt([
								{
									default: toUser.userOutqueue,
									message: `Enter new outqueue for ${newUser}:`,
									name: `newOutqueue`,
									type: `input`,
								},
							])
							// eslint-disable-next-line @typescript-eslint/no-shadow
							.then(async answers => {
								toUser.userOutqueue = answers.newOutqueue as string;
							});
						break;
					}

					default: {
						changeAttributesBoo = false;
					}
				}
			});

	/* Assemble the user variables into a string using template literals. */
	await cmdOdbc(CRTUSRPRF(toUser)).catch(async (error: odbc.NodeOdbcError) => {
		const parseError = await parseErrorMessage(error);
		console.error(chalk.red.bgBlack(`${parseError.errorNumber}: ${parseError.errorMessage}`));
		throw new Error(`${parseError.errorNumber}: ${parseError.errorMessage}`);
	});

	const query5 = await queryOdbc(
		`SELECT * FROM QSYS2.USER_INFO_BASIC WHERE AUTHORIZATION_NAME = '${newUser}'`,
	);
	/* If the result of query4 is empty, then the user failed to create. */
	if (query5.length === 0) {
		console.error(`User ${newUser} failed to create.`);
		return `User ${newUser} failed to create.`;
	}

	console.log(`User ${newUser} created.`);

	await cmdOdbc(
		CHGUSRPRF(
			toUser.userId,
			toUser.userPasswordExpirationInterval,
			toUser.userMaximumAllowedStorage,
			toUser.userCharacterCodeSetId,
		),
	).catch(async (error: odbc.NodeOdbcError) => {
		const parseError = await parseErrorMessage(error);
		console.error(chalk.red.bgBlack(`${parseError.errorNumber}: ${parseError.errorMessage}`));
		// throw new Error(`${parseError.errorNumber}: ${parseError.errorMessage}`);
		// TODO Leave this function and do something else.
	});

	/* Change object owner to QSECOFR. */
	await cmdOdbc(CHGOBJOWN(newUser));
	/* Check if fromUser exists on any authorization lists, then copy newUser to them. */
	/* This information is on the view AUTHORIZATION_LIST_USER_INFO. */
	const query6 = await queryOdbc(
		`SELECT * FROM QSYS2.AUTHORIZATION_LIST_USER_INFO WHERE AUTHORIZATION_NAME = '${copyFromUser}'`,
	);
	/* If the result of query6 is empty, then the user does not exist on any authorization lists. */
	if (query6.length === 0) {
		console.log(`User ${copyFromUser} does not exist on any authorization lists.`);
	} else {
		/* Copy newUser to all authorization lists that fromUser is on. */
		query6.forEach(async element => {
			const thing = element as unknown as IbmiAuthorizationListInterface;
			await cmdOdbc(
				`ADDAUTLE AUTL(${thing.AUTHORIZATION_LIST}) USER(${newUser}) AUT(${thing.OBJECT_AUTHORITY})`,
			).catch(async (error: odbc.NodeOdbcError) => {
				const parseError = await parseErrorMessage(error);
				if (parseError.errorNumber === `CPF2282`) {
					// If the user already exists on the authorization list, do nothing.
					console.error(
						chalk.yellow.bgBlack(
							`${parseError.errorNumber}: ${parseError.errorMessage} ${thing.AUTHORIZATION_LIST}`,
						),
					);
					return 0;
				}
				// Otherwise, throw an error.

				console.error(
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
	await cmdOdbc(
		`ADDDIRE USRID(${newUser.slice(0, 7)} ${RDB_NAME}) USRD(${
			toUser.userText
		}) USER(${newUser})`,
	).catch(async (error: odbc.NodeOdbcError) => {
		const parseError = await parseErrorMessage(error);
		if (parseError.errorNumber === `CPF9082`) {
			// If the user already exists on the directory list, do nothing.
			console.error(
				chalk.yellow.bgBlack(`${parseError.errorNumber}: ${parseError.errorMessage}`),
			);
			return 0;
		}
		// Otherwise, throw an error.

		console.error(chalk.red.bgBlack(`${parseError.errorNumber}: ${parseError.errorMessage}`));
		throw new Error(`${parseError.errorNumber}: ${parseError.errorMessage}`);
	});

	return `Success`;
};
