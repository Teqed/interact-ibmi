#!/usr/bin/env ts-node
/* This is the module for making ODBC database connections to the IBMi AS400.
It has prepared statements as well as allowing custom statements from user input. */
import {loginUser} from './login.mjs';
import odbc from 'odbc';

export async function testOdbc() {
	const connectionString = `DRIVER=IBM i Access ODBC Driver;SYSTEM='PUB400.COM';UID=${loginUser.loginId};PWD=${loginUser.loginPw};`;
	const connection = await odbc.connect(connectionString);
	const query: odbc.Result<any> = await connection.query('SELECT * FROM TEQ1.TQ002AP');
	console.log(query);
	const v1 = 'Carol';
	const v2 = query[0][query.columns[1].name] as string;
	const v3 = query[0][query.columns[2].name] as string;
	const update: odbc.Result<any> = await connection.query(`INSERT INTO TEQ1.TQ002AP VALUES('${v1}', '${v2}', '${v3}')`);
	console.log(update);
}

export async function freeOdbc(statement: string) {
	const connectionString = `DRIVER=IBM i Access ODBC Driver;SYSTEM='PUB400.COM';UID=${loginUser.loginId};PWD=${loginUser.loginPw};`;
	const connection = await odbc.connect(connectionString);
	const query: odbc.Result<any> = await connection.query(statement);
	return query;
}
