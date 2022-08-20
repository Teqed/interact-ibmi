#!/usr/bin/env ts-node
/* This is the module for making ODBC database connections to the IBMi AS400.
It has prepared statements as well as allowing custom statements from user input. */
import odbc from 'odbc';
import {connection} from './index.mjs';
import {loginUser} from './loginUser.mjs';

const getrows = (query: odbc.Result<any>) => {
	// Get the number of rows in the result set.
	const numberRows = query.length;
	// Iterate over the result set.
	for (let index = 0; index < numberRows; index++) {
		// Get the current row.
		const row = query[index] as number;
		// Print the row.
		console.log(row);
	}
};

const getvalues = (query: odbc.Result<any>) => {
	// Get the the name and value of each row and column.
	const numberRows = query.length;
	// Iterate over the result set.
	for (let index = 0; index < numberRows; index++) {
		// Get the current row.
		const row = query[index] as number;
		// Iterate over the columns in the row.
		for (const element of query.columns) {
			// Get the current column.
			const column = element;
			// Print the column name and value.
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			console.log(`${column.name}: ${row[column.name as keyof typeof row]}`);
		}
	}
};

export const queryOdbc = async (statement: string): Promise<odbc.Result<any>> => {
	// Execute the prepared statement.
	return connection.query(statement);
};

export const testOdbc = async (command: string) => {
	const query: odbc.Result<any> = await queryOdbc(command);
	getrows(query);
};

export const updateOdbc = async () => {
	const query: odbc.Result<any> = await queryOdbc('SELECT * FROM TEQ1.TQ002AP');
	const v1 = 'Carol';
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const v2 = query[0][query.columns[1].name] as string;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const v3 = query[0][query.columns[2].name] as string;
	const update: odbc.Result<any> = await queryOdbc(
		`INSERT INTO TEQ1.TQ002AP VALUES('${v1}', '${v2}', '${v3}')`,
	);
	console.log(update);
};

export const connectOdbc = async () => {
	const connectionString = `DRIVER=IBM i Access ODBC Driver;SYSTEM='PUB400.COM';UID=${loginUser.loginId};PWD=${loginUser.loginPw};`;
	return odbc.connect(connectionString);
};

export const findUser = async (user: string) => {
	const query: odbc.Result<unknown> = await connection.query(
		`SELECT * FROM QSYS2.USER_INFO WHERE AUTHORIZATION_NAME = '${user}'`,
	);
	getvalues(query);
	return query;
};
