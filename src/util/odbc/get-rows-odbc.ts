import type odbc from 'odbc';
import ora from 'ora';
import { queryOdbc } from './odbc-util.js';

export default async (statement: string) => {
	const spinner = ora(`Executing SQL statement...`).start();
	try {
		const query: odbc.Result<Array<number | string>> = await queryOdbc(statement);
		// Destructure query into an array of objects
		const rows = query.map(row => {
			const object: Record<string, string> = {};
			// eslint-disable-next-line no-restricted-syntax
			for (const column of query.columns) {
				object[column.name] = row[column.name as keyof typeof row as number] as string;
			}

			return object;
		});
		spinner.succeed(`SQL statement executed!`);

		return rows;
	} catch (error: unknown) {
		console.log(error);
		// const narrowError = error as NodeOdbcError;
		// console.log(narrowError.odbcErrors.forEach);
		spinner.fail(`SQL statement failed!`);
		return `SQL statement failed!`;
	}
};
