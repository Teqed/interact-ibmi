/* This is the login module.
It asks for the user's name and password, which is used for logging in to the IBMi AS400. */
import chalk from 'chalk';
import ora from 'ora';
import getJobInfo from '../../util/odbc/get-job-info.js';
import { odbcLogin } from '../../util/odbc/odbc-util.js';
// import sequelizeLogin from '../../util/sequelize/connection.js';
import {
	genericGetCommand,
	genericPasswordMenu,
	genericPressEnterPrompt,
} from '../generic/generic.js';

export default async () => {
	const login = async function (): Promise<{
		loginId: string;
		loginPw: string;
		loginSys: string;
	}> {
		console.clear();
		console.log(
			chalk.bgBlue(
				// eslint-disable-next-line max-len
				`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Login IBMi\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`,
			),
		);
		const loginSys = await genericGetCommand({
			allowEmpty: false,
			clearPromptOnDone: false,
			default: `PUB400.COM`,
			message: `System hostname:`,
		});
		const loginId = await genericGetCommand({
			allowEmpty: false,
			clearPromptOnDone: false,
			message: `User ID:`,
		});

		const loginPw = await genericPasswordMenu({
			clearPromptOnDone: false,
			mask: `*`,
			message: `Password:`,
		});

		const odbcLoginPromise = odbcLogin(loginId, loginPw, loginSys);
		// const sequelizeLoginPromise = sequelizeLogin(loginId, loginPw, loginSys);

		const spinner = ora(`Logging in to ODBC...`).start();
		try {
			await odbcLoginPromise;
			spinner.succeed(`Logged in to ODBC!`);
			void getJobInfo();
		} catch (error: unknown) {
			// Play a sound.
			process.stdout.write(`\u0007`);
			type OdbcErrors = Array<{ code: number; message: string; state: string }>;
			type NodeOdbcErrors = { odbcErrors: OdbcErrors };
			try {
				const nodeOdbcError = error as NodeOdbcErrors;
				if (nodeOdbcError.odbcErrors[0].code === 8_002) {
					spinner.fail(
						chalk.red(
							`Login failed! Please check your username and password and try again.`,
						),
					);
					await genericPressEnterPrompt();
					return await login();
				}

				spinner.fail(
					chalk.red(
						`Login failed! Reason given: 
${nodeOdbcError.odbcErrors[0].message}`,
					),
				);
				await genericPressEnterPrompt();
				return await login();
			} catch (error_: unknown) {
				void error_;
				// throw new Error(`Login failed!`, { cause: error_ as Error });
			}

			spinner.fail(`Login failed!`);

			// throw new Error(`Login failed!`, { cause: error as Error });
		}

		/* const spinner2 = ora(`Logging in to Sequelize...`).start();
		try {
			await sequelizeLoginPromise;
			spinner2.succeed(`Logged in to Sequelize!`);
			// eslint-disable-next-line @typescript-eslint/no-implicit-any-catch
		} catch (error) {
			spinner2.fail(`Login failed!`);
			throw new Error(`Login failed!`, { cause: error as Error });
		} */

		return { loginId, loginPw, loginSys };
	};

	return await login();
};
