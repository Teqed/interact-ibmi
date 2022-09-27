import getRows from '../../util/odbc/get-rows-odbc.js';
import { genericGetCommand } from '../generic.js';

export default async () => {
	const inputCommand: string = await genericGetCommand({
		message: `Enter SQL query:`,
	});
	const result = await getRows(inputCommand);

	return result;
};
