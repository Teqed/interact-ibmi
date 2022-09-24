import type odbc from 'odbc';
import { queryOdbc } from './odbc-util.js';

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
