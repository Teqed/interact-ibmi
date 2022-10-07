/* This is the login module.
It asks for the user's name and password, which is used for logging in to the IBMi AS400. */
import { odbcLogin } from '../../util/odbc/odbc-util.js';
import sequelizeLogin from '../../util/sequelize/connection.js';
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

	const loginPw = await genericPasswordMenu({
		clearPromptOnDone: false,
		mask: `*`,
		message: `Password:`,
	});

	await odbcLogin(loginId, loginPw, loginSys);
	await sequelizeLogin(loginId, loginPw, loginSys);

	return { loginId, loginPw, loginSys };
};
