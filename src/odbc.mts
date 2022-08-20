#!/usr/bin/env ts-node
/* This is the module for making ODBC database connections to the IBMi AS400.
It has prepared statements as well as allowing custom statements from user input. */
import { loginUser } from "./login.mjs";
import { connection } from "./index.mjs";
import odbc from "odbc";

export async function testOdbc(command: string) {
	const query: odbc.Result<any> = await queryOdbc(command);
	getrows(query);
}

export async function updateOdbc() {
	const query: odbc.Result<any> = await queryOdbc("SELECT * FROM TEQ1.TQ002AP");
	getvalues(query);
	const v1 = "Carol";
	const v2 = query[0][query.columns[1].name] as string;
	const v3 = query[0][query.columns[2].name] as string;
	const update: odbc.Result<any> = await queryOdbc(
		`INSERT INTO TEQ1.TQ002AP VALUES('${v1}', '${v2}', '${v3}')`,
	);
	console.log(update);
}

export async function queryOdbc(statement: string): Promise<odbc.Result<any>> {
	// Execute the prepared statement.
	return connection.query(statement);
}

export async function connectOdbc() {
	const connectionString = `DRIVER=IBM i Access ODBC Driver;SYSTEM='PUB400.COM';UID=${loginUser.loginId};PWD=${loginUser.loginPw};`;
	return odbc.connect(connectionString);
}

export async function findUser(user: string) {
	const query: odbc.Result<any> = await connection.query(
		`SELECT * FROM QSYS2.USER_INFO WHERE AUTHORIZATION_NAME = '${user}'`,
	);
	getvalues(query);
	return query;
}

function getrows(query: odbc.Result<any>) {
	// Get the number of rows in the result set.
	const numRows = query.length;
	// Iterate over the result set.
	for (let i = 0; i < numRows; i++) {
		// Get the current row.
		const row = query[i] as number;
		// Print the row.
		console.log(row);
	}
}

function getvalues(query: odbc.Result<any>) {
	// Get the the name and value of each row and column.
	const numRows = query.length;
	// Iterate over the result set.
	for (let i = 0; i < numRows; i++) {
		// Get the current row.
		const row = query[i] as number;
		// Iterate over the columns in the row.
		for (const element of query.columns) {
			// Get the current column.
			const column = element;
			// Print the column name and value.
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			console.log(`${column.name}: ${row[column.name as keyof typeof row]}`);
		}
	}
}
