/* This is the login module.
It asks for the user's name and password, which is used for logging in to the IBMi AS400. */
import inquirer, { type Answers } from 'inquirer';
import { assert } from '@sindresorhus/is';
import { odbcLogin } from './odbc-util.js';
import loginUser from './login-user.js';

export default async () => {
	// Ask for the user's name and password.
	// Attempt to log in to the system.
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
