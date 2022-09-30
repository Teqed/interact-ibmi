import chalk from 'chalk';
import type odbc from 'odbc';
import ora from 'ora';
import printJobLog from '../../util/odbc/print-job-log.js';
import { parseODBCErrorMessage } from '../../util/qcmdexc/qcmdexc-util.js';
import QCMDEXC from '../../util/qcmdexc/qcmdexc.js';
import { genericGetCommand, genericPressEnterPrompt } from '../generic.js';

export default async function () {
	const inputCommand: string = await genericGetCommand({
		message: `Enter command to send:`,
	});
	const spinner = ora(`Executing command ${chalk.green(inputCommand)}`).start();
	try {
		const rtnCommand = await QCMDEXC(inputCommand);
		/* Find the output from rtnCommand */
		spinner.succeed(`Command executed!`);
		console.log(rtnCommand);
	} catch (error: unknown) {
		const parsedError = await parseODBCErrorMessage(error as odbc.NodeOdbcError);
		spinner.fail(
			`${chalk.red(parsedError.messageIdentifier)} - ${chalk.yellow(
				parsedError.messageText,
			)}`,
		);
		await printJobLog();
	}

	return genericPressEnterPrompt();
}
