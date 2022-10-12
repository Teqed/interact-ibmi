/* eslint-disable canonical/filename-match-regex */
import chalk from 'chalk';
import { stringToBoolean } from '../../../util.js';
import { sequelize } from '../connection.js';

// Copy a record from TQ001AP and insert it into TQ001AP.
// Find USERID 'Adam' and KEYCOLOR 'Blue' and copy it to USERID 'Edward'
export default async () => {
	const results = await sequelize.models.TQ001AP.findOne({
		where: {
			KEYCOLOR: `Red`,
			USERID: `Bob`,
		},
	});
	// If results is null, then the record was not found.
	if (results === null) {
		console.log(chalk.redBright(`Record not found.`));
		return;
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const record = results.get();
	record.USERID = `Edward`;
	record.ACCESS = stringToBoolean(record.ACCESS);
	await sequelize.models.TQ001AP.create(record);
	console.log(chalk.greenBright(`TQ001AP record created:`));
	console.table(record);
};
