/* This is the module for making ODBC database connections to the IBMi AS400.
It has prepared statements as well as allowing custom statements from user input. */
import type odbc from 'odbc';
import { connection } from './login.js';

export const getrows = (query: odbc.Result<Array<number | string>>) => {
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

export const getvalues = (query: odbc.Result<Array<number | string>>) => {
	// Iterate over the results.
	query.forEach(row => {
		// Iterate over the columns in the row.
		query.columns.forEach(column => {
			// Print the column name and value.
			console.log(
				`${column.name}: ${row[column.name as keyof typeof row] as unknown as string}`,
			);
		});
	});
};

// queryOdbc is a function that takes a query and returns a promise that resolves to the result of the query.
// It does not show the result of the query to the user.
export const queryOdbc = async (statement: string): Promise<odbc.Result<Array<number | string>>> =>
	connection.query(statement);

export const cmdOdbc = async (qcmdexc: string): Promise<odbc.Result<Array<number | string>>> =>
	queryOdbc(`CALL QSYS2.QCMDEXC('${qcmdexc}')`);
