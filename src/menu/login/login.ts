/* This is the login module.
It asks for the user's name and password, which is used for logging in to the IBMi AS400. */
import { odbcLogin } from '../../util/odbc/odbc-util.js';
import { genericGetCommand, genericPasswordMenu } from '../generic.js';

export default async () => {
	console.clear();
	const loginSys = await genericGetCommand({
		clearPromptOnDone: false,
		default: `PUB400.COM`,
		message: `System hostname:`,
	});
	const loginId = await genericGetCommand({
		clearPromptOnDone: false,
		message: `User ID:`,
	});
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const loginPw = await genericPasswordMenu({
		clearPromptOnDone: false,
		mask: `*`,
		message: `Password:`,
	});

	await odbcLogin(loginId, loginPw, loginSys);

	return {loginId, loginPw, loginSys};
};
