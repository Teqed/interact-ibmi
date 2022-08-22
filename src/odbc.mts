/* This is the module for making ODBC database connections to the IBMi AS400.
It has prepared statements as well as allowing custom statements from user input. */
import odbc from 'odbc';
import { connection } from './index.mjs';
import loginUser from './loginUser.mjs';

const getrows = (query: odbc.Result<Array<number | string>>) => {
	// Get the number of rows in the result set.
	const numberRows = query.length;
	// Iterate over the result set.
	for (let index = 0; index < numberRows; index++) {
		// Get the current row.
		const row = query[index] as unknown as number;
		// Print the row.
		console.log(row);
	}
};

const getvalues = (query: odbc.Result<Array<number | string>>) => {
	// Get the the name and value of each row and column.
	const numberRows = query.length;
	// Iterate over the result set.
	for (let index = 0; index < numberRows; index++) {
		// Get the current row.
		const row = query[index] as unknown as number;
		// Iterate over the columns in the row.
		// ? This for..loop may need to be replaced with an array iteration.
		// eslint-disable-next-line no-restricted-syntax
		for (const element of query.columns) {
			// Get the current column.
			const column = element;
			// Print the column name and value.
			console.log(
				`${column.name}: ${row[column.name as keyof typeof row] as unknown as string}`,
			);
		}
	}
};

export const queryOdbc = async (statement: string): Promise<odbc.Result<Array<number | string>>> =>
	connection.query(statement);

export const testOdbc = async (command: string) => {
	const query: odbc.Result<Array<number | string>> = await queryOdbc(command);
	getrows(query);
};

export const updateOdbc = async () => {
	const query: odbc.Result<Array<number | string>> = await queryOdbc(
		'SELECT * FROM TEQ1.TQ002AP',
	);
	const v1 = 'Carol';
	const v2 = query[0][query.columns[1].name as keyof typeof query as number] as string;
	const v3 = query[0][query.columns[2].name as keyof typeof query as number] as string;
	const update: odbc.Result<Array<number | string>> = await queryOdbc(
		`INSERT INTO TEQ1.TQ002AP VALUES('${v1}', '${v2}', '${v3}')`,
	);
	console.log(update);
};

export const connectOdbc = async () => {
	const connectionString = `
DRIVER=IBM i Access ODBC Driver;SYSTEM='PUB400.COM';UID=${loginUser.loginId};PWD=${loginUser.loginPw};`;
	return odbc.connect(connectionString);
};

export const findUser = async (user: string) => {
	const query: odbc.Result<Array<number | string>> = await connection.query(
		`SELECT * FROM QSYS2.USER_INFO WHERE AUTHORIZATION_NAME = '${user}'`,
	);
	getvalues(query);
	return query;
};
