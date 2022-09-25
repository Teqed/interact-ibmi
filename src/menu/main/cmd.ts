import QCMDEXC from '../../util/qcmdexc/qcmdexc.js';
import { genericGetCommand, genericPressEnterPrompt } from '../generic.js';

export default async function () {
	const inputCommand: string = await genericGetCommand({
		message: `Enter command to send:`,
	});
	console.log(inputCommand);
	const rtnCommand = await QCMDEXC(inputCommand);
	/* Find the output from rtnCommand */
	console.log(rtnCommand.return);
	return genericPressEnterPrompt();
}
