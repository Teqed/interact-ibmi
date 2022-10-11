/* This is the login module.
It asks for the user's name and password, which is used for logging in to the IBMi AS400. */
import ora from 'ora';
import { odbcLogin } from '../../util/odbc/odbc-util.js';
import sequelizeLogin from '../../util/sequelize/connection.js';
import { genericPressEnterPrompt, genericGetCommand, genericPasswordMenu } from '../generic.js';

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

	console.time(`odbc`);
	const odbcLoginThing = odbcLogin(loginId, loginPw, loginSys);

	const spinner = ora(`Logging in to ODBC...`).start();
	if (await odbcLoginThing) {
		spinner.succeed(`Logged in to ODBC!`);
	} else {
		spinner.fail(`Login failed!`);
	}

	console.timeEnd(`odbc`);
	console.time(`sequelize`);

	const sequelizeLoginThing = sequelizeLogin(loginId, loginPw, loginSys);

	const spinner2 = ora(`Logging in to Sequelize...`).start();
	if (await sequelizeLoginThing) {
		spinner2.succeed(`Logged in to Sequelize!`);
	} else {
		spinner2.fail(`Login failed!`);
	}

	console.timeEnd(`sequelize`);
	await genericPressEnterPrompt();

	return { loginId, loginPw, loginSys };
};
