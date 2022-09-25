import type odbc from 'odbc';
import { type QualifiedObject } from '../types.js';

export function qualifyObject(QualifiedObject: QualifiedObject): string {
	// TODO: Test the special object parameters.
	if (
		QualifiedObject.object === `*SAME` ||
		QualifiedObject.object === `*NONE` ||
		QualifiedObject.object === `*SIGNOFF` ||
		QualifiedObject.object === `*USRPRF` ||
		QualifiedObject.object === `*WRKSTN` ||
		QualifiedObject.object === `*DEV` ||
		QualifiedObject.object === `*SYSVAL` ||
		QualifiedObject.object === `*ASSIST` ||
		QualifiedObject.object === `*HEX` ||
		QualifiedObject.object === `*LANGIDSHR` ||
		QualifiedObject.object === `*LANGIDUNQ`
	)
		return QualifiedObject.object;
	const innerLibrary = QualifiedObject.library ?? `*LIBL`;
	// return a string in the format 'library/object'.
	return `${innerLibrary}/${QualifiedObject.object}`;
}

/* Parse the input into an object with two properties: 'errorNumber' and 'errorMessage'. */
/* Remove the prefix '[IBM][System i Access ODBC Driver][DB2 for i5/OS]' from the error message. */
/* Separate the error number from the error message where the first space hyphen space is. */
export async function parseErrorMessage(error: odbc.NodeOdbcError) {
	// https://www.ibm.com/docs/en/i/7.2?topic=odbc-i-access-error-messages
	// [vendor][ODBC-component][data-source] error-message
	let { message } = error.odbcErrors[0];
	/* Remove the prefix '[IBM][System i Access ODBC Driver][DB2 for i5/OS]' from the error message. */
	message = message.replace(/\[IBM]\[System i Access ODBC Driver]\[DB2 for i5\/OS]/, ``);
	const errorNumber = message.split(` - `)[0];
	const errorMessage = message.split(` - `)[1];
	return { errorMessage, errorNumber };
}

export async function parseODBCErrorMessage(error: odbc.NodeOdbcError) {
	/* https://www.ibm.com/docs/en/i/7.2?topic=odbc-i-access-error-messages
	Error messages have the following format:
		[vendor][ODBC-component][data-source] error-message
	The prefixes in brackets ([]) identify the source of the error.
	When the error occurs in the data source, the [vendor] and [ODBC-component] prefixes identify
		the vendor and name of the ODBC component that received the error from the data source.
	The following table shows the values of these prefixes returned by the IBM i Access ODBC driver.
		Error source - Value
	Driver Manager - [Microsoft] [ODBC driver Manager] [N/A]
	IBM i Access ODBC driver - [IBM(R)] [IBM i Access ODBC driver] N/A
	NLS messages - [IBM] [IBM i Access ODBC driver] Column #: NLS error message number NLS error message text
		Communication layer - [IBM] [IBM i Access ODBC driver] Communications link failure.
		Comm RC=xxxx (message text) Where xxxx is the error number in decimal, not hexadecimal, format.
		Message text describing the nature of your error appears with the error number.
	Db2 for i - [IBM] [IBM i Access ODBC driver] [DB2] Server error message
		Viewing Db2 for i error message text:
	For errors that begin with: Use this CL command
		SQL: DSPMSGD RANGE(SQLxxxx) MSGF(QSQLMSG)
		IWS or PWS: DSPMSGD RANGE(ZZZxxxx) MSGF(QIWS/QIWSMSG) where ZZZ is IWS or PWS
	Refer to Common ODBC errors for help with other ODBC error messages.
	You can search and view NLS or communication error messages in the Service,
	Error and Trace message help topic in the IBM i Access Client Solutions online User's Guide.
	For more information about error message ids, see IBM i Access return codes
	or the IBM i Access Client Solutions online User's Guide. */

	// https://www.ibm.com/docs/en/i/7.2?topic=errors-sql
	// List of common SQL IBM® i Access ODBC errors that are encountered by applications.
	/* SQL0104 - Token &1 was not valid. Valid tokens: &2
		Invalid IBM i Access ODBC SQL Syntax message
	SQL0113 - Name &1 not allowed.
		Update the IBM i Access ODBC Relational Database Directory
	SQL0114 - Relational database &1 not the same as current &2 server
		Update the IBM i Access ODBC Relational Database Directory Entry.
	SQL0204 - MYSYSCONF not found
		For IBM i Access ODBC: Optional table on the server.
	SQL0208 - ORDER BY column not in result table
		For IBM i Access ODBC: Problem with ORDER BY clause
	SQL0900 - Application process not in a connected state
		Update the IBM i Access ODBC Relational Database Directory Entry.
	SQL0901 - SQL System Error
		For IBM i Access ODBC: Server machine (function) check error
	SQL5001 - Column qualifier or table &2 undefined.
		Change your naming convention in your IBM i Access ODBC DSN.
	SQL5016 - Object name &1 not valid for naming convention
		Change your naming convention in your IBM i Access ODBC DSN.
	SQL7008 - &1 in &2 not valid for operation. The reason code is 3
		For IBM i Access ODBC: Error related to files not journaled */

	// https://www.ibm.com/docs/en/i/7.2?topic=codes-listing-sql-messages
	// These tables list SQL messages.
	// Use these tables to find message text, cause text, recovery text, and corresponding SQLCODEs and SQLSTATEs.
	/* You can use the following tables with both positive and negative SQLCODEs. 
	Take the absolute value of the SQLCODE, then append it to the letters SQL (for SQLCODEs less than 10 000) 
	or the letters SQ (for SQLCODEs greater than or equal to 10 000) to determine the message identifier. 
	Each SQLCODE corresponds to one or more SQLSTATEs. */

	// Make sure we only received one error. Otherwise, throw a new error.
	if (error.odbcErrors.length !== 1) {
		throw new Error(`Expected 1 error, but received ${error.odbcErrors.length} errors.`);
	}

	let { message } = error.odbcErrors[0];
	/* Remove the prefix from the error message. */
	// Start by finding the first bracket.
	const firstBracket = message.indexOf(`[`);
	// Then find the second bracket.
	const secondBracket = message.indexOf(`]`, firstBracket + 1);
	// Then find the third bracket.
	const thirdBracket = message.indexOf(`]`, secondBracket + 1);
	// Then find the fourth bracket.
	const fourthBracket = message.indexOf(`]`, thirdBracket + 1);
	// Then find the fifth bracket, if it exists.
	const fifthBracket = message.indexOf(`]`, fourthBracket + 1);
	// Then find the sixth bracket, if it exists.
	const sixthBracket = message.indexOf(`]`, fifthBracket + 1);
	// Now, remove all the brackets and their contents.
	if (sixthBracket !== -1) {
		message = message.slice(sixthBracket + 1);
	} else if (fifthBracket !== -1) {
		message = message.slice(fifthBracket + 1);
	} else if (fourthBracket !== -1) {
		message = message.slice(fourthBracket + 1);
	} else if (thirdBracket !== -1) {
		message = message.slice(thirdBracket + 1);
	} else if (secondBracket !== -1) {
		message = message.slice(secondBracket + 1);
	} else if (firstBracket !== -1) {
		message = message.slice(firstBracket + 1);
	}

	// Remove any leading or trailing whitespace.
	message = message.trim();
	// Find the error identifier and the message.
	// The error identifier is usually the first 7 characters. It doesn't always exist.
	// If it does, the delimiter between it and the message is ` - `.
	// We'll call the error identifier the `errorNumber` and the message the `errorMessage`.
	let errorNumber = ``;
	let errorMessage = ``;
	const dashIndex = message.indexOf(` - `);
	if (dashIndex !== -1) {
		errorNumber = message.slice(0, dashIndex);
		errorMessage = message.slice(dashIndex + 3);
	} else {
		errorMessage = message;
	}

	// Remove any leading or trailing whitespace.
	errorNumber = errorNumber.trim();
	errorMessage = errorMessage.trim();
	// Return the error number and the error message.
	return { errorMessage, errorNumber };
}
