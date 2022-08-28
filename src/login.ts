/* This is the login module.
It asks for the user's name and password, which is used for logging in to the IBMi AS400. */
import enquirer from 'enquirer';
import odbc from 'odbc';
import loginUser from './login-user.js';

// eslint-disable-next-line import/no-mutable-exports
export let connection: odbc.Connection;
export const odbcLogin = async (loginId: string, loginPw: string) => {
	loginUser.loginId = loginId;
	loginUser.loginPw = loginPw;
	const connectionString = `
DRIVER=IBM i Access ODBC Driver;SYSTEM='PUB400.COM';UID=${loginUser.loginId};PWD=${loginUser.loginPw};`;
	return odbc.connect(connectionString);
};

export const interactiveLogin = async () => {
	const loginid = await enquirer.prompt([
		{
			initial() {
				return `Anon`;
			},
			message: `What is your User ID?`,
			name: `login_name`,
			type: `input`,
		},
		{
			message: `What is your password?`,
			name: `login_pw`,
			type: `password`,
		},
	]);
	loginUser.loginId = loginid[`login_name` as keyof typeof loginid];
	loginUser.loginPw = loginid[`login_pw` as keyof typeof loginid];
	return odbcLogin(loginUser.loginId, loginUser.loginPw);
};
