/* This is the login module.
It asks for the user's name and password, which is used for logging in to the IBMi AS400. */
import inquirer, { type Answers } from 'inquirer';
import odbc from 'odbc';
import { assert } from '@sindresorhus/is';
import loginUser from './login-user.js';

// eslint-disable-next-line import/no-mutable-exports
export let connection: odbc.Connection;
export const odbcLogin = async (loginId: string, loginPw: string) => {
	const connectionString = `
DRIVER=IBM i Access ODBC Driver;SYSTEM='PUB400.COM';UID=${loginId};PWD=${loginPw};`;
	connection = await odbc.connect(connectionString);
	return connection;
};

export const interactiveLogin = async () => {
	const loginid = (await inquirer.prompt([
		{
			default() {
				return ``;
			},
			message: `What is your User ID?`,
			name: `login_name`,
			type: `input`,
		},
		{
			mask: `*`,
			message: `What is your password?`,
			name: `login_pw`,
			type: `password`,
		},
	])) as Promise<Answers>;
	const deconLoginId = loginid[`login_name` as keyof typeof loginid];
	const deconLoginPw = loginid[`login_pw` as keyof typeof loginid];
	assert.string(deconLoginId);
	assert.string(deconLoginPw);
	loginUser.loginId = deconLoginId;
	loginUser.loginPw = deconLoginPw;
	return odbcLogin(loginUser.loginId, loginUser.loginPw);
};
