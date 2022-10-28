import chalk from 'chalk';
import type odbc from 'odbc';
import ora, { type Ora } from 'ora';
import { genericPressEnterPrompt } from '../../menu/generic/generic.js';
import printJobLog from '../odbc/print-job-log.js';
import { parseODBCErrorMessage } from './qcmdexc-util.js';
import qcmdexc from './qcmdexc.js';

export default async function (
	command: string,
	options?: {
		debug?: boolean;
		pauseOnError?: boolean;
		printJobLog?: boolean;
		spinner?: boolean;
		throwOnError?: boolean;
	},
) {
	let spinner: Ora = ora();
	let failure = false;
	if (options?.spinner ?? true) {
		spinner = ora(`Executing command...`).start();
	}

	const doCommand = await qcmdexc(command).catch(async (error: odbc.NodeOdbcError) => {
		const parseError = await parseODBCErrorMessage(error);
		const errorString = `${chalk.bgBlack.red(parseError.messageIdentifier)} - ${chalk.bgRed.black(parseError.messageText)}`;
		if (options?.spinner ?? true) {
			failure = true;
			spinner.fail(`Command failed! ${errorString}
			`);
		}

		if (options?.printJobLog ?? true) {
			await printJobLog();
		}

		if (options?.pauseOnError ?? true) {
			await genericPressEnterPrompt();
		}

		if (options?.throwOnError ?? true) {
			// eslint-disable-next-line @typescript-eslint/no-throw-literal
			throw parseError;
		}

		if (options?.debug) {
			throw error;
		}
	});

	if ((options?.spinner ?? true) && !failure) {
		spinner.succeed(`Command executed!`);
	}

	return doCommand;
}
