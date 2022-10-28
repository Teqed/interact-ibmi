import genericSequelize from '../../util/sequelize/generic.js';
import { genericGetCommand, genericPressEnterPrompt } from '../generic/generic.js';

export default async function () {
	const inputCommand: string = await genericGetCommand({
		message: `Enter SQL query:`,
	});
	const result = await genericSequelize(inputCommand);
	console.log(`Result 0:`);
	console.log(result[0]);
	console.log(`Metadata 1:`);
	console.log(result[1]);
	return genericPressEnterPrompt();
}
