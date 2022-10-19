import { genericGetCommand } from '../../menu/generic.js';
import { stringToBoolean } from '../../util.js';
import { sequelize } from '../sequelize/connection.js';

export default async (table: string) => {
	// Use sequelize to insert a record into table

	// Now find the name of each column in the table and store it in an array
	const attributes = sequelize.models[table].getAttributes();
	const columns = Object.keys(attributes);
	// Now prompt the user to enter a value for each column using the genericGetCommand() function
	// Then store the values in an array
	const values = [];
	const columnNames = [];
	for (const column of columns) {
		// Push current column name to columnNames array
		columnNames.push(column);
		// eslint-disable-next-line no-await-in-loop
		const value = await genericGetCommand({
			clearPromptOnDone: false,
			message: `Enter a value for ${column}`,
		});
		// Push value to array
		values.push(value);
		// await genericGetCommand(`Enter a value for ${column}`);
	}

	const v1 = values[0];
	const v2 = values[1];
	const v3 = stringToBoolean(values[2]);
	const c1 = columnNames[0];
	const c2 = columnNames[1];
	const c3 = columnNames[2];
	// Now insert a new record from the results.
	const update = await sequelize.models[table].create({
		[c1]: v1,
		[c2]: v2,
		[c3]: v3,
	});
	console.log(update);
	const query = await sequelize.models[table].findAll({});
	console.log(query);
};
