import type odbc from 'odbc';
import { type CreateUserInterface } from './types.js';

/* Assemble the user variables into a string using template literals. */
export function CHGUSRPRF(
	userIdCHGUSRPRF: string,
	userPasswordExpirationIntervalCHGUSRPRF: string,
	userMaximumAllowedStorageCHGUSRPRF: string,
	userCharacterCodeSetIdCHGUSRPRF: string,
) {
	const qcmdexc = `CHGUSRPRF \
USRPRF(${userIdCHGUSRPRF}) \
PWDEXP(*YES) \
PWDINT(${userPasswordExpirationIntervalCHGUSRPRF}) \
MAXSTG(${userMaximumAllowedStorageCHGUSRPRF}) \
CCSID(${userCharacterCodeSetIdCHGUSRPRF})`;
	return qcmdexc;
}

export function CHGOBJOWN(newUser: string) {
	const qcmdexc = `CHGOBJOWN \
OBJ(QSYS/${newUser}) \
OBJTYPE(*USRPRF) \
NEWOWN(QSECOFR)`;
	return qcmdexc;
}

export function CRTUSRPRF(toUser: CreateUserInterface) {
	return `CRTUSRPRF \
USRPRF(${toUser.userId}) \
STATUS(*ENABLED) \
PASSWORD(${toUser.userPassword}) \
PWDEXP(*YES) \
USRCLS(${toUser.userClass}) \
INLPGM(${toUser.userInitialProgram}) \
INLMNU(${toUser.userInitialMenu}) \
LMTCPB(${toUser.userLimitCapabilities}) \
TEXT(${toUser.userText}) \
SPCAUT(${toUser.userSpecialAuthority}) \
JOBD(${toUser.userJobDescription}) \
GRPPRF(${toUser.userGroupProfile}) \
GRPAUT(${toUser.userGroupAuthority}) \
ACGCDE(${toUser.userAccountingCode}) \
DLVRY(${toUser.userDelivery}) \
OUTQ(${toUser.userOutqueue}) \
ATNPGM(${toUser.userAttentionProgram}) \
SUPGRPPRF(${toUser.userSupplementalGroups})`;
	// ! TEXT param needs to cancel apostrophes.
	// TODO Remove undefined values.
}

/* Parse the input into an object with two properties: 'errorNumber' and 'errorMessage'. */
/* Remove the prefix '[IBM][System i Access ODBC Driver][DB2 for i5/OS]' from the error message. */
/* Separate the error number from the error message where the first space hyphen space is. */
export async function parseErrorMessage(error: odbc.NodeOdbcError) {
	let { message } = error.odbcErrors[0];
	/* Remove the prefix '[IBM][System i Access ODBC Driver][DB2 for i5/OS]' from the error message. */
	message = message.replace(/\[IBM]\[System i Access ODBC Driver]\[DB2 for i5\/OS]/, ``);
	const errorNumber = message.split(` - `)[0];
	const errorMessage = message.split(` - `)[1];
	return { errorMessage, errorNumber };
}
