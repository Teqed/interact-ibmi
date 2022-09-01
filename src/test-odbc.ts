import type odbc from 'odbc';
import { queryOdbc, getrows } from './odbc-util.js';

// testOdbc shows the results of the query to the user, by basic getrows() query.

export const testOdbc = async (command: string) => {
	try {
		const query: odbc.Result<Array<number | string>> = await queryOdbc(command);
		getrows(query);
		return query;
	} catch (error: unknown) {
		console.log(error);
		// const narrowError = error as NodeOdbcError;
		// console.log(narrowError.odbcErrors.forEach);
		return error;
	}
};

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
