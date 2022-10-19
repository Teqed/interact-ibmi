import getRows from '../../../util/odbc/get-rows-odbc.js';

export default async function () {
	const inputCommand = `select * from teq1.tq001ap where USERID='Adam'`;
	console.time(`odbcMenu`);
	const result = getRows(inputCommand);
	const result2 = getRows(inputCommand);
	const result3 = getRows(inputCommand);
	const result4 = getRows(inputCommand);
	const result5 = getRows(inputCommand);
	// Wait for all promises to resolve
	await Promise.all([result, result2, result3, result4, result5]);
	console.timeEnd(`odbcMenu`);
	console.log(result);
}
