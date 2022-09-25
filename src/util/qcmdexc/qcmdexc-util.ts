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
