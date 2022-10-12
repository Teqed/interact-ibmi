/* eslint-disable canonical/filename-match-regex */
import chalk from 'chalk';
import { sequelize } from '../connection.js';

// View the records in TQ001AP and print them in a pretty table.
export default async () => {
	const results = await sequelize.models.TQ001AP.findAll();
	console.log(chalk.greenBright(`TQ001AP records:`));
	// Push each record to an array
	const records = [];
	for (const result of results) {
		records.push(result.get());
	}

	// Print the array
	console.table(records);
};
