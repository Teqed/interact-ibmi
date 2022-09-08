import { cmdOdbc } from '../../odbc-util.js';
import { genericGetCommand } from '../util.js';

export default async function () {
	const inputCommand: string = await genericGetCommand({
		message: `Enter command to send:`,
		name: `Command Input`,
	});
	console.log(inputCommand);
	const rtnCommand = await cmdOdbc(inputCommand);
	/* Find the output from rtnCommand */
	console.log(rtnCommand.return);
	return rtnCommand.return;
}
