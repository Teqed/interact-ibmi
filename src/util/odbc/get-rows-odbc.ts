import type odbc from 'odbc';
import { queryOdbc, getrows } from './odbc-util.js';

// testOdbc shows the results of the query to the user, by basic getrows() query.

export default async (command: string) => {
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
