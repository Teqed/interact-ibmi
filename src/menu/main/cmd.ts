import { cmdOdbc } from '../../util/odbc/odbc-util.js';
import { genericGetCommand } from '../generic.js';

export default async function () {
	const inputCommand: string = await genericGetCommand({
		message: `Enter command to send:`,
	});
	console.log(inputCommand);
	const rtnCommand = await cmdOdbc(inputCommand);
	/* Find the output from rtnCommand */
	console.log(rtnCommand.return);
	return rtnCommand.return;
}
