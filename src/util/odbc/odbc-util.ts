/* This is the module for making ODBC database connections to the IBMi AS400.
It has prepared statements as well as allowing custom statements from user input. */
import odbc from 'odbc';

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

let connection: odbc.Connection;
// This accepts a username and password and logs into an IBM i system using ODBC.
export const odbcLogin = async (loginId: string, loginPw: string, system = `PUB400.COM`) => {
	const connectionString = `
DRIVER=IBM i Access ODBC Driver;SYSTEM='${system}';UID=${loginId};PWD=${loginPw};`;
	connection = await odbc.connect(connectionString);
	return connection;
};

// queryOdbc is a function that takes a query and returns a promise that resolves to the result of the query.
// It does not show the result of the query to the user.
export const queryOdbc = async (statement: string): Promise<odbc.Result<Array<number | string>>> =>
	connection.query(statement);
