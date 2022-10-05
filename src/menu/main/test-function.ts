import { testUpdateOdbc2 } from '../../util/odbc/update-odbc.js';
import { genericGetCommand } from '../generic.js';

export default async () => {
	console.time();
	const table = await genericGetCommand({ message: 'What table would you like to edit?'});
	await testUpdateOdbc2(table);
	console.timeEnd();
};
