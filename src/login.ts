/* This is the login module.
It asks for the user's name and password, which is used for logging in to the IBMi AS400. */
import inquirer from 'inquirer';
import odbc from 'odbc';
import loginUser from './login-user.js';

// eslint-disable-next-line import/no-mutable-exports
export let connection: odbc.Connection;

export const login = async () => {
	const loginid = await inquirer.prompt({
		default() {
			return `Anon`;
		},
		message: `What is your User ID?`,
		name: `login_name`,
		type: `input`,
	});
	const loginpw = await inquirer.prompt({
		mask: `*`,
		message: `What is your password?`,
		name: `login_pw`,
		type: `password`,
	});
	loginUser.loginId = loginid.login_name as string;
	loginUser.loginPw = loginpw.login_pw as string;
	const connectionString = `
DRIVER=IBM i Access ODBC Driver;SYSTEM='PUB400.COM';UID=${loginUser.loginId};PWD=${loginUser.loginPw};`;
	connection = await odbc.connect(connectionString);
	return connection;
};
