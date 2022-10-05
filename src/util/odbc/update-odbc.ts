import type odbc from 'odbc';
import { queryOdbc } from './odbc-util.js';
import { TQ001AP } from '../../models/TQ001AP.js';
import * as Sequelize from '@sequelize/core';
import { genericGetCommand } from '../../menu/generic.js';
import { loginProvided } from '../../main.js';

export const updateOdbc = async () => {
	const query: odbc.Result<Array<number | string>> = await queryOdbc(
		`SELECT * FROM TEQ1.TQ002AP`,
	);
	const v1 = `Carol`;
	const v2 = query[0][query.columns[1].name as keyof typeof query as number] as string;
	const v3 = query[0][query.columns[2].name as keyof typeof query as number] as string;
	const update: odbc.Result<Array<number | string>> = await queryOdbc(
		`INSERT INTO TEQ1.TQ002AP VALUES('${v1}', '${v2}', '${v3}')`,
	);
	console.log(update);
};

export const updateOdbc2 = async () => {
	const query: odbc.Result<Array<number | string>> = await queryOdbc(
		`SELECT * FROM TEQ1.TQ002AP`,
	);
	const v1 = `Carol`;
	const v2 = query[0][query.columns[1].name as keyof typeof query as number] as string;
	const v3 = query[0][query.columns[2].name as keyof typeof query as number] as string;
	const update: odbc.Result<Array<number | string>> = await queryOdbc(
		`INSERT INTO TEQ1.TQ002AP VALUES('${v1}', '${v2}', '${v3}')`,
	);
	console.log(update);
};

export const testUpdateOdbc = async () => {
	// Use sequelize to insert a record into TQ001AP
	// Start by initializing the models
	const sequelize = new Sequelize.Sequelize('IBMiDSN', loginProvided.loginId, loginProvided.loginPw, {
		host: 'PUB400.COM',
		dialect: 'ibmi',
	});
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	  } catch (error) {
		console.error('Unable to connect to the database:', error);
	  }
	
	TQ001AP.initModel(sequelize);
	// Now retrieve all records where the first name is Adam
	const query = await sequelize.models.TQ001AP.findAll({
		where: {
			USERID: 'Adam',
		},
	});
	// Now insert a new record for each record retrieved from the query above into TQ001AP but with the first name changed to Carol
	for (const record of query) {
		const newRecord = record.toJSON();
		newRecord.USERID = 'Carol';
		await sequelize.models.TQ001AP.create(newRecord);
	}

};

export const testUpdateOdbc2 = async (table: string) => {
	// Use sequelize to insert a record into table
	// Start by initializing the models
	const sequelize = new Sequelize.Sequelize('IBMiDSN', loginProvided.loginId, loginProvided.loginPw, {
		host: 'PUB400.COM',
		dialect: 'ibmi',
	});
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	  } catch (error) {
		console.error('Unable to connect to the database:', error);
	  }

	TQ001AP.initModel(sequelize);
	
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
		const value = (await genericGetCommand({
			message: `Enter a value for ${column}`,	
			clearPromptOnDone: false,
		}));
		// Push value to array
		values.push(value);
		// await genericGetCommand(`Enter a value for ${column}`);
	}
	const v1 = values[0];
	console.log(v1);
	const v2 = values[1];
	console.log(v2);
	const v3 = values[2];
	console.log(v3);
	const c1 = columnNames[0];
	console.log(c1);
	const c2 = columnNames[1];
	console.log(c2);
	const c3 = columnNames[2];
	console.log(c3);
	// Find the access of 'Bob' for 'Red' and log it.
	const query = await sequelize.models[table].findAll({
		where: {
			[c1]: 'Bob',
			[c2]: 'Red',
		},
	});
	console.log(query);
	// Now insert a new record from the results.
	await sequelize.models[table].create({
		[c1]: v1,
		[c2]: v2,
		[c3]: v3,
		});
};

