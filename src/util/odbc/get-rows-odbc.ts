import chalk from 'chalk';
import type odbc from 'odbc';
import ora from 'ora';
import { parseODBCErrorMessage } from '../qcmdexc/qcmdexc-util.js';
import { queryOdbc } from './odbc-util.js';

export default async (statement: string) => {
	const spinner = ora(`Executing SQL statement...`).start();
	try {
		const query: odbc.Result<Array<number | string>> = await queryOdbc(statement);
		// Destructure query into an array of objects
		const rows = query.map(row => {
			const object: Record<string, string> = {};

			for (const column of query.columns) {
				object[column.name] = row[column.name as keyof typeof row as number] as string;
			}

			return object;
		});
		spinner.succeed(`SQL statement executed!`);

		return rows;
	} catch (error: unknown) {
		const parsedError = await parseODBCErrorMessage(error as odbc.NodeOdbcError);
		spinner.fail(
			`${chalk.red(parsedError.messageIdentifier)} - ${chalk.yellow(
				parsedError.messageText,
			)}`,
		);
		// Return a promise of an empty string.
		// eslint-disable-next-line unicorn/no-useless-promise-resolve-reject
		return Promise.resolve(``);
	}
};
