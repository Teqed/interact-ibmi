import type odbc from 'odbc';
import { type CreateUserInterface } from './types.js';

/* Assemble the user variables into a string using template literals. */
export function CHGUSRPRF(
	userIdCHGUSRPRF: string,
	userPasswordExpirationIntervalCHGUSRPRF: string,
	userMaximumAllowedStorageCHGUSRPRF: string,
	userCharacterCodeSetIdCHGUSRPRF: string,
) {
	let actualMaxStorage: number = userMaximumAllowedStorageCHGUSRPRF as unknown as number;
	if (actualMaxStorage >= 2_147_483_647) {
		actualMaxStorage = 2_147_483_647;
	}

	const qcmdexc = `CHGUSRPRF \
USRPRF(${userIdCHGUSRPRF}) \
PWDEXP(*YES) \
PWDEXPITV(${userPasswordExpirationIntervalCHGUSRPRF}) \
MAXSTG(${actualMaxStorage}) \
CCSID(${userCharacterCodeSetIdCHGUSRPRF})`;
	return qcmdexc;
}

/*
Keyword
Description
Choices
Notes
USRPRF	User profile	Simple name	Required, Key, Positional 1
PASSWORD	User password	Character value, *SAME, *NONE	Optional, Positional 2
PWDEXP	Set password to expired	*SAME, *NO, *YES	Optional
STATUS	Status	*SAME, *ENABLED, *DISABLED	Optional
USRCLS	User class	*SAME, *USER, *SYSOPR, *PGMR, *SECADM, *SECOFR	Optional
ASTLVL	Assistance level	*SAME, *SYSVAL, *BASIC, *INTERMED, *ADVANCED	Optional
CURLIB	Current library	Name, *SAME, *CRTDFT	Optional
INLPGM	Initial program to call	Single values: *SAME, *NONE
Other values: Qualified object name	Optional
Qualifier 1: Initial program to call	Name
Qualifier 2: Library	Name, *LIBL, *CURLIB
INLMNU	Initial menu	Single values: *SAME, *SIGNOFF
Other values: Qualified object name	Optional
Qualifier 1: Initial menu	Name
Qualifier 2: Library	Name, *LIBL, *CURLIB
LMTCPB	Limit capabilities	*SAME, *NO, *PARTIAL, *YES	Optional
TEXT	Text 'description'	Character value, *SAME, *BLANK	Optional
SPCAUT	Special authority	Single values: *SAME, *USRCLS, *NONE
Other values (up to 8 repetitions): *ALLOBJ, *AUDIT, *IOSYSCFG, *JOBCTL, *SAVSYS, *SECADM, *SERVICE, *SPLCTL	Optional, Positional 3
SPCENV	Special environment	*SAME, *SYSVAL, *NONE, *S36	Optional
DSPSGNINF	Display sign-on information	*SAME, *NO, *YES, *SYSVAL	Optional
PWDEXPITV	Password expiration interval	1-366, *SAME, *SYSVAL, *NOMAX	Optional
PWDCHGBLK	Block password change	1-99, *SAME, *SYSVAL, *NONE	Optional
LCLPWDMGT	Local password management	*SAME, *YES, *NO	Optional
LMTDEVSSN	Limit device sessions	*SAME, *SYSVAL, *YES, *NO, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9	Optional
KBDBUF	Keyboard buffering	*SAME, *SYSVAL, *NO, *TYPEAHEAD, *YES	Optional
MAXSTGLRG	Maximum allowed storage large	Character value, *SAME, *NOMAX	Optional
MAXSTG	Maximum allowed storage	Integer, *SAME, *NOMAX	Optional
PTYLMT	Highest schedule priority	0-9, *SAME	Optional
JOBD	Job description	Single values: *SAME
Other values: Qualified object name	Optional
Qualifier 1: Job description	Name, QDFTJOBD
Qualifier 2: Library	Name, *LIBL, *CURLIB
GRPPRF	Group profile	Name, *SAME, *NONE	Optional
OWNER	Owner	*SAME, *USRPRF, *GRPPRF	Optional
GRPAUT	Group authority	*SAME, *NONE, *ALL, *CHANGE, *USE, *EXCLUDE	Optional
GRPAUTTYP	Group authority type	*PRIVATE, *PGP, *SAME	Optional
SUPGRPPRF	Supplemental groups	Single values: *SAME, *NONE
Other values (up to 15 repetitions): Name	Optional
ACGCDE	Accounting code	Character value, *SAME, *BLANK	Optional
DOCPWD	Document password	Name, *SAME, *NONE	Optional
MSGQ	Message queue	Single values: *SAME, *USRPRF
Other values: Qualified object name	Optional
Qualifier 1: Message queue	Name
Qualifier 2: Library	Name, *LIBL, *CURLIB
DLVRY	Delivery	*SAME, *NOTIFY, *BREAK, *HOLD, *DFT	Optional
SEV	Severity code filter	0-99, *SAME	Optional
PRTDEV	Print device	Name, *SAME, *WRKSTN, *SYSVAL	Optional
OUTQ	Output queue	Single values: *SAME, *WRKSTN, *DEV
Other values: Qualified object name	Optional
Qualifier 1: Output queue	Name
Qualifier 2: Library	Name, *LIBL, *CURLIB
ATNPGM	Attention program	Single values: *SAME, *SYSVAL, *NONE, *ASSIST
Other values: Qualified object name	Optional
Qualifier 1: Attention program	Name
Qualifier 2: Library	Name, *LIBL, *CURLIB
SRTSEQ	Sort sequence	Single values: *SAME, *SYSVAL, *HEX, *LANGIDSHR, *LANGIDUNQ
Other values: Qualified object name	Optional
Qualifier 1: Sort sequence	Name
Qualifier 2: Library	Name, *LIBL, *CURLIB
LANGID	Language ID	Character value, *SAME, *SYSVAL	Optional
CNTRYID	Country or region ID	Character value, *SAME, *SYSVAL	Optional
CCSID	Coded character set ID	Integer, *SAME, *SYSVAL, *HEX	Optional
CHRIDCTL	Character identifier control	*SAME, *SYSVAL, *DEVD, *JOBCCSID	Optional
SETJOBATR	Locale job attributes	Single values: *SAME, *SYSVAL, *NONE
Other values (up to 6 repetitions): *CCSID, *DATFMT, *DATSEP, *DECFMT, *SRTSEQ, *TIMSEP	Optional
LOCALE	Locale	Path name, *SAME, *SYSVAL, *NONE, *C, *POSIX	Optional
USROPT	User options	Single values: *SAME, *NONE
Other values (up to 7 repetitions): *CLKWD, *EXPERT, *ROLLKEY, *NOSTSMSG, *STSMSG, *HLPFULL, *PRTMSG	Optional
UID	User ID number	1-4294967294, *SAME	Optional
GID	Group ID number	1-4294967294, *SAME, *GEN, *NONE	Optional
HOMEDIR	Home directory	Path name, *USRPRF, *SAME	Optional
EIMASSOC	EIM association	Single values: *NOCHG
Other values: Element list	Optional
Element 1: EIM identifier	Character value, *USRPRF
Element 2: Association type	*TARGET, *SOURCE, *TGTSRC, *ADMIN, *ALL
Element 3: Association action	*REPLACE, *ADD, *REMOVE
Element 4: Create EIM identifier	*NOCRTEIMID, *CRTEIMID
USREXPDATE	User expiration date	Date, *NONE, *USREXPITV, *SAME	Optional
USREXPITV	User expiration interval	1-366	Optional
*/

type ClBoo = '*NO' | '*YES';
type ClBooSame = '*NO' | '*SAME' | '*YES';
type ClBooSameSysval = '*NO' | '*SAME' | '*SYSVAL' | '*YES';
type QualifiedObject = {
	library: string | undefined; // *LIBL, *CURLIB
	object: string;
};

export function CHGUSRPRFFULL(
	USRPRF: string,
	PASSWORD?: string, // *SAME, *NONE
	PWDEXP?: ClBooSame,
	STATUS?: '*DISABLED' | '*ENABLED' | '*SAME',
	USRCLS?: '*PGMR' | '*SAME' | '*SECADM' | '*SECOFR' | '*SYSOPR' | '*USER',
	ASTLVL?: '*ADVANCED' | '*BASIC' | '*INTERMED' | '*SAME' | '*SYSVAL',
	CURLIB?: QualifiedObject, // *SAME, *CRTDFT
	INLPGM?: QualifiedObject, // *SAME, *NONE
	INLMNU?: QualifiedObject, // *SAME, *SIGNOFF
	LMTCPB?: '*NO' | '*PARTIAL' | '*SAME' | '*YES',
	TEXT?: string, // *SAME, *BLANK
	SPCAUT?: string[], // *SAME, *USRCLS, *NONE
	// *ALLOBJ, *AUDIT, *IOSYSCFG, *JOBCTL, *SAVSYS, *SECADM, *SERVICE, *SPLCTL
	SPCENV?: '*NONE' | '*S36' | '*SAME' | '*SYSVAL',
	DSPSGNINF?: ClBooSameSysval,
	PWDEXPITV?: number | string, // *SAME, *SYSVAL, *NOMAX, 1-366
	PWDCHGBLK?: number | string, // *SAME, *SYSVAL, *NONE, 1-99
	LCLPWDMGT?: ClBooSame,
	LMTDEVSSN?: number | string, // *SAME, *SYSVAL, *YES, *NO, 0-9
	KBDBUF?: string, // *SAME, *SYSVAL, *NO, *TYPEAHEAD, *YES
	MAXSTGLRG?: string, // *SAME, *NOMAX
	MAXSTG?: number | string, // *SAME, *NOMAX, Integer
	PTYLMT?: number | '*SAME', // 0-9
	JOBD?: QualifiedObject, // *SAME
	GRPPRF?: string, // *SAME, *NONE
	OWNER?: '*SAME' | '*SYSVAL' | '*USRPRF',
	GRPAUT?: '*ALL' | '*CHANGE' | '*EXCLUDE' | '*NONE' | '*SAME' | '*USE',
	GRPAUTTYP?: '*PGP' | '*PRIVATE' | '*SAME',
	SUPGRPPRF?: string[], // *SAME, *NONE
	ACGCDE?: string, // *SAME, *BLANK
	DOCPWD?: string, // *SAME, *NONE
	MSGQ?: QualifiedObject, // *SAME, *USRPRF
	DLVRY?: '*BREAK' | '*DFT' | '*HOLD' | '*NOTIFY' | '*SAME',
	SEV?: number | '*SAME', // 0-99
	PRTDEV?: string, // *SAME, *WRKSTN, *SYSVAL
	OUTQ?: QualifiedObject, // *SAME, *WRKSTN, *DEV
	ATNPGM?: QualifiedObject, // *SAME, *SYSVAL, *NONE, *ASSIST
	SRTSEQ?: QualifiedObject, // *SAME, *SYSVAL, *HEX, *LANGIDSHR, *LANGIDUNQ
	LANGID?: string, // *SAME, *SYSVAL
	CNTRYID?: string, // *SAME, *SYSVAL
	CCSID?: number | '*HEX' | '*SAME' | '*SYSVAL',
	CHRIDCTL?: '*DEVD' | '*JOBCCSID' | '*SAME' | '*SYSVAL',
	SETJOBATR?: string[], // *SAME, *SYSVAL, *NONE
	// *CCSID, *DATFMT, *DATSEP, *DECFMT, *SRTSEQ, *TIMSEP
	LOCALE?: string, // *SAME, *SYSVAL, *NONE, *C, *POSIX, Path name
	USROPT?: string[], // *SAME, *NONE
	// *CLKWD, *EXPERT, *ROLLKEY, *NOSTSMSG, *STSMSG, *HLPFULL, *PRTMSG
	UID?: number | '*SAME', // 1-4294967294
	GID?: number | '*GEN' | '*NONE' | '*SAME', // 1-4294967294
	HOMEDIR?: string, // *SAME, *USRPRF, Path name
	EIMASSOC?:
		| '*NOCHG'
		| {
				ACTION: '*ADD' | '*REMOVE' | '*REPLACE'; // *USRPRF
				ASSOC: '*ADMIN' | '*ALL' | '*SOURCE' | '*TARGET' | '*TGTSRC';
				CREATE: '*CRTEIMID' | '*NOCRTEIMID';
				EIMID: string;
		  },
	USREXPDATE?: Date | '*NONE' | '*SAME' | '*USREXPITV',
	USREXPITV?: number, // 1-366
) {
	// Create a string that says 'CHGUSRPRF ..." and then add the parameters. Skip any that are undefined.
	let command = `CHGUSRPRF USRPRF(${USRPRF})`;
	if (PASSWORD !== undefined) command += ` PASSWORD(${PASSWORD})`;
	if (PWDEXP !== undefined) command += ` PWDEXP(${PWDEXP})`;
	if (STATUS !== undefined) command += ` STATUS(${STATUS})`;
	if (USRCLS !== undefined) command += ` USRCLS(${USRCLS})`;
	if (ASTLVL !== undefined) command += ` ASTLVL(${ASTLVL})`;
	if (CURLIB !== undefined) command += ` CURLIB(${CURLIB})`;
	if (INLPGM !== undefined) command += ` INLPGM(${INLPGM})`;
	if (INLMNU !== undefined) command += ` INLMNU(${INLMNU})`;
	if (LMTCPB !== undefined) command += ` LMTCPB(${LMTCPB})`;
	if (TEXT !== undefined) command += ` TEXT(${TEXT})`;
	if (SPCAUT !== undefined) command += ` SPCAUT(${SPCAUT})`;
	if (SPCENV !== undefined) command += ` SPCENV(${SPCENV})`;
	if (DSPSGNINF !== undefined) command += ` DSPSGNINF(${DSPSGNINF})`;
	if (PWDEXPITV !== undefined) command += ` PWDEXPITV(${PWDEXPITV})`;
	if (PWDCHGBLK !== undefined) command += ` PWDCHGBLK(${PWDCHGBLK})`;
	if (LCLPWDMGT !== undefined) command += ` LCLPWDMGT(${LCLPWDMGT})`;
	if (LMTDEVSSN !== undefined) command += ` LMTDEVSSN(${LMTDEVSSN})`;
	if (KBDBUF !== undefined) command += ` KBDBUF(${KBDBUF})`;
	if (MAXSTGLRG !== undefined) command += ` MAXSTGLRG(${MAXSTGLRG})`;
	if (MAXSTG !== undefined) command += ` MAXSTG(${MAXSTG})`;
	if (PTYLMT !== undefined) command += ` PTYLMT(${PTYLMT})`;
	if (JOBD !== undefined) command += ` JOBD(${JOBD})`;
	if (GRPPRF !== undefined) command += ` GRPPRF(${GRPPRF})`;
	if (OWNER !== undefined) command += ` OWNER(${OWNER})`;
	if (GRPAUT !== undefined) command += ` GRPAUT(${GRPAUT})`;
	if (GRPAUTTYP !== undefined) command += ` GRPAUTTYP(${GRPAUTTYP})`;
	if (SUPGRPPRF !== undefined) command += ` SUPGRPPRF(${SUPGRPPRF})`;
	if (ACGCDE !== undefined) command += ` ACGCDE(${ACGCDE})`;
	if (DOCPWD !== undefined) command += ` DOCPWD(${DOCPWD})`;
	if (MSGQ !== undefined) command += ` MSGQ(${MSGQ})`;
	if (DLVRY !== undefined) command += ` DLVRY(${DLVRY})`;
	if (SEV !== undefined) command += ` SEV(${SEV})`;
	if (PRTDEV !== undefined) command += ` PRTDEV(${PRTDEV})`;
	if (OUTQ !== undefined) command += ` OUTQ(${OUTQ})`;
	if (ATNPGM !== undefined) command += ` ATNPGM(${ATNPGM})`;
	if (SRTSEQ !== undefined) command += ` SRTSEQ(${SRTSEQ})`;
	if (LANGID !== undefined) command += ` LANGID(${LANGID})`;
	if (CNTRYID !== undefined) command += ` CNTRYID(${CNTRYID})`;
	if (CCSID !== undefined) command += ` CCSID(${CCSID})`;
	if (CHRIDCTL !== undefined) command += ` CHRIDCTL(${CHRIDCTL})`;
	if (SETJOBATR !== undefined) command += ` SETJOBATR(${SETJOBATR})`;
	if (LOCALE !== undefined) command += ` LOCALE(${LOCALE})`;
	if (USROPT !== undefined) command += ` USROPT(${USROPT})`;
	if (UID !== undefined) command += ` UID(${UID})`;
	if (GID !== undefined) command += ` GID(${GID})`;
	if (HOMEDIR !== undefined) command += ` HOMEDIR(${HOMEDIR})`;
	if (EIMASSOC !== undefined) {
		command +=
			EIMASSOC === `*NOCHG`
				? ` EIMASSOC(*NOCHG)`
				: ` EIMASSOC(${EIMASSOC.ACTION} ${EIMASSOC.ASSOC} ${EIMASSOC.CREATE} ${EIMASSOC.EIMID})`;
	}

	if (USREXPDATE !== undefined) command += ` USREXPDATE(${USREXPDATE})`;
	if (USREXPITV !== undefined) command += ` USREXPITV(${USREXPITV})`;

	return await this;
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
TEXT(''${toUser.userText}'') \
SPCAUT(${toUser.userSpecialAuthority}) \
JOBD(${toUser.userJobDescription}) \
GRPPRF(${toUser.userGroupProfile}) \
GRPAUT(${toUser.userGroupAuthority}) \
ACGCDE(${toUser.userAccountingCode}) \
DLVRY(${toUser.userDelivery}) \
OUTQ(${toUser.userOutqueue}) \
ATNPGM(${toUser.userAttentionProgram}) \
SUPGRPPRF(${toUser.userSupplementalGroups})`;
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
