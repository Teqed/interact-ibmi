import genericSequelize from '../../util/sequelize/generic.js';
import { genericGetCommand, genericPressEnterPrompt } from '../generic.js';

export default async function () {
	const inputCommand: string = await genericGetCommand({
		message: `Enter SQL query:`,
	});
	const result = await genericSequelize(inputCommand).catch(async (error: Error) => {
		// TODO: Finish error handling.
		// See parseErrorMessage() in src\util\qcmdexc\qcmdexc-util.ts
		void error;
	});
	console.log(result);
	return genericPressEnterPrompt();
}
