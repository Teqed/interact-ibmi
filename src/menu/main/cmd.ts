import chalk from 'chalk';
import executeCommand from '../../util/qcmdexc/execute-command.js';
import { genericGetCommand, genericPressEnterPrompt } from '../generic.js';

export default async function () {
	const inputCommand: string = await genericGetCommand({
		message: `Enter command to send:`,
	});
	const commandExecute = await executeCommand(inputCommand, {
		pauseOnError: false,
		throwOnError: false,
	});
	// Console log commandExecute if it's not void.
	if (commandExecute) {
		console.log(commandExecute);
	} else {
		console.log(`
		${chalk.blueBright(`Command failed. See job log for details.`)}
`);
	}

	return genericPressEnterPrompt();
}
