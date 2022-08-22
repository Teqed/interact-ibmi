import odbc from 'odbc';
import { queryOdbc, getrows, getvalues } from './odbc.mjs';

// testOdbc shows the results of the query to the user, by basic getrows() query.

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
export const updateOdbc2 = async () => {
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

export const findUser = async (user: string) => {
	const query = await queryOdbc(
		`SELECT * FROM QSYS2.USER_INFO WHERE AUTHORIZATION_NAME = '${user}'`,
	);
	getvalues(query);
	return query;
};

/* Copies an existing user and creates a new user with the same privileges. */
export const copyUser = async (user: string, newUser: string, userDescription: string) => {
	const query = await queryOdbc(
		`SELECT * FROM QSYS2.USER_INFO WHERE AUTHORIZATION_NAME = '${user}'`,
	);
	/* If the result of query is empty, then the user does not exist. */
	if (query.length === 0) {
		console.log(`User ${user} does not exist.`);
		return;
	}
	const query2 = await queryOdbc(
		`SELECT * FROM QSYS2.USER_INFO WHERE AUTHORIZATION_NAME = '${newUser}'`,
	);
	/* If the result of query2 is not empty, then the new user already exists. */
	if (query2.length !== 0) {
		console.log(`User ${newUser} already exists.`);
		return;
	}
	/* Create an array using the results of query[0]. */
	const userInfo = Object.values(query[0]);
	/* If their accounting code is NOCOPY, don't copy this user. */
	if (userInfo[2] === 'NOCOPY') {
		console.log(`User ${user} is not copyable.`);
		return;
	}
	/* Insert the new user into the QSYS2.USER_INFO table. */
	const update = await queryOdbc(`INSERT INTO QSYS2.USER_INFO VALUES()`);
	console.log(update);
};
