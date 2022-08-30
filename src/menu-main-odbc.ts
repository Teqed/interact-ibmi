import { testOdbc } from './test-odbc.js';
import { genericGetCommand } from './menu-util.js';

export default async function () {
	const inputCommand: string = await genericGetCommand({
		message: `Enter SQL query:`,
		name: `ODBC DB Query`,
	});
	return testOdbc(inputCommand);
}
