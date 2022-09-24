import getRows from '../../util/odbc/get-rows-odbc.js';
import { genericGetCommand } from '../generic.js';

export default async function () {
	const inputCommand: string = await genericGetCommand({
		message: `Enter SQL query:`,
		name: `ODBC DB Query`,
	});
	return getRows(inputCommand);
}
