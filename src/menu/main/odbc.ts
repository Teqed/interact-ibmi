import chalk from 'chalk';
import getRows from '../../util/odbc/get-rows-odbc.js';
import { genericGetCommand, genericPressEnterPrompt } from '../generic/generic.js';

export default async function () {
	const inputCommand: string = await genericGetCommand({
		clearPromptOnDone: false,
		message:
			chalk.bgBlue(
				`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Send SQL\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`,
			) + `\nEnter SQL query:`,
	});
	const result = await getRows(inputCommand).catch(async (error: Error) => {
		// TODO: Finish error handling.
		// See parseErrorMessage() in src\util\qcmdexc\qcmdexc-util.ts
		void error;
	});
	console.log(result);
	return genericPressEnterPrompt();
}
