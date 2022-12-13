import chalk from 'chalk';
import executeCommand from '../../util/qcmdexc/execute-command.js';
import { genericGetCommand, genericPressEnterPrompt } from '../generic/generic.js';

export default async function () {
	const inputCommand: string = await genericGetCommand({
		clearPromptOnDone: false,
		message:
			chalk.bgBlue(
				`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Send Command\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`,
			) + `\nEnter command to send:`,
	});
	const commandExecute = await executeCommand(inputCommand, {
		pauseOnError: false,
		throwOnError: false,
		alwaysPrintJobLog: true,
	});
	void commandExecute;

	return genericPressEnterPrompt();
}
