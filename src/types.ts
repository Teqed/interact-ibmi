/* eslint-disable @typescript-eslint/ban-types */
/* Create an interface similar to fromUser. */
export type IbmiUserInterface = {
	ACCOUNTING_CODE: string | null;
	ASSISTANCE_LEVEL: string;
	ATTENTION_KEY_HANDLING_PROGRAM_LIBRARY_NAME: string;
	ATTENTION_KEY_HANDLING_PROGRAM_NAME: string;
	AUTHORITY_COLLECTION_ACTIVE: string;
	AUTHORITY_COLLECTION_REPOSITORY_EXISTS: string;
	AUTHORIZATION_NAME: string;
	BLOCK_PASSWORD_CHANGE: string;
	CHARACTER_CODE_SET_ID: string;
	CHARACTER_IDENTIFIER_CONTROL: string;
	COUNTRY_OR_REGION_ID: string;
	CREATION_TIMESTAMP: string;
	CURRENT_LIBRARY_NAME: string;
	DATE_PASSWORD_EXPIRES: string;
	DAYS_UNTIL_PASSWORD_EXPIRES: string | null;
	DAYS_USED_COUNT: number;
	DIGITAL_CERTIFICATE_INDICATOR: string;
	DISPLAY_SIGNON_INFORMATION: string;
	GROUP_AUTHORITY: string;
	GROUP_AUTHORITY_TYPE: string;
	GROUP_ID_NUMBER: bigint;
	GROUP_MEMBER_INDICATOR: string;
	GROUP_PROFILE_NAME: string;
	HIGHEST_SCHEDULING_PRIORITY: string;
	HOME_DIRECTORY: string;
	INITIAL_MENU_LIBRARY_NAME: string;
	INITIAL_MENU_NAME: string;
	INITIAL_PROGRAM_LIBRARY_NAME: string;
	INITIAL_PROGRAM_NAME: string;
	JOB_DESCRIPTION_LIBRARY_NAME: string;
	JOB_DESCRIPTION_NAME: string;
	KEYBOARD_BUFFERING: string;
	LANGUAGE_ID: string;
	LAST_RESET_TIMESTAMP: null;
	LAST_USED_TIMESTAMP: string;
	LIMIT_CAPABILITIES: string;
	LIMIT_DEVICE_SESSIONS: string;
	LOCALE_JOB_ATTRIBUTES: string;
	LOCALE_PATH_NAME: string;
	LOCAL_PASSWORD_MANAGEMENT: string;
	MAXIMUM_ALLOWED_STORAGE: bigint;
	MAXIMUM_SIGN_ON_ATTEMPTS: string;
	MESSAGE_QUEUE_DELIVERY_METHOD: string;
	MESSAGE_QUEUE_LIBRARY_NAME: string;
	MESSAGE_QUEUE_NAME: string;
	MESSAGE_QUEUE_SEVERITY: number;
	NETSERVER_DISABLED: string;
	NO_PASSWORD_INDICATOR: string;
	OBJECT_AUDITING_VALUE: string;
	OUTPUT_QUEUE_LIBRARY_NAME: string;
	OUTPUT_QUEUE_NAME: string;
	OWNER: string;
	PASE_SHELL_PATH: string | null;
	PASSWORD_CHANGE_DATE: string;
	PASSWORD_EXPIRATION_INTERVAL: number;
	PASSWORD_LEVEL_0_1: string;
	PASSWORD_LEVEL_2_3: string;
	PASSWORD_LEVEL_4: string;
	PREVIOUS_SIGNON: string;
	PRINT_DEVICE: string;
	SET_PASSWORD_TO_EXPIRE: string;
	SIGN_ON_ATTEMPTS_NOT_VALID: number;
	SIZE: number;
	SORT_SEQUENCE_TABLE_LIBRARY_NAME: string | null;
	SORT_SEQUENCE_TABLE_NAME: string;
	SPECIAL_AUTHORITIES: string | null;
	SPECIAL_ENVIRONMENT: string;
	STATUS: string;
	STORAGE_USED: bigint;
	SUPPLEMENTAL_GROUP_COUNT: number;
	SUPPLEMENTAL_GROUP_LIST: string | null;
	TEXT_DESCRIPTION: string;
	USER_ACTION_AUDIT_LEVEL: number | string | null;
	USER_CLASS_NAME: string;
	USER_CREATOR: string;
	USER_DEFAULT_PASSWORD: null;
	USER_ENTITLEMENT_REQUIRED: string;
	USER_EXPIRATION_ACTION: string;
	USER_EXPIRATION_DATE: null;
	USER_EXPIRATION_INTERVAL: number;
	USER_ID_NUMBER: bigint;
	USER_OPTIONS: string;
	USER_OWNER: string;
};
export type CreateUserInterface = {
	userAccountingCode: string;
	userAttentionProgram: string;
	userCharacterCodeSetId: number | '*HEX' | '*SAME' | '*SYSVAL';
	userClass: string;
	userDelivery: string;
	userGroupAuthority: string;
	userGroupProfile: string;
	userId: string;
	userInitialMenu: string;
	userInitialProgram: string;
	userJobDescription: string;
	userLimitCapabilities: string;
	userMaximumAllowedStorage: string;
	userOutqueue: string;
	userPassword: string;
	userPasswordExpirationInterval: string;
	userSpecialAuthority: string;
	userSupplementalGroups: string;
	userText: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface GenericInputPrompt {
	message: string;
	name: string;
}
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface GenericListPrompt {
	choices: string[];
	message: string;
	name: string;
}

export type BriefIbmiUserInterface = {
	ACCOUNTING_CODE: string | null;
	AUTHORIZATION_NAME: string;
	DAYS_UNTIL_PASSWORD_EXPIRES: number | null;
	INITIAL_MENU_LIBRARY_NAME: string;
	INITIAL_MENU_NAME: string;
	INITIAL_PROGRAM_LIBRARY_NAME: string;
	INITIAL_PROGRAM_NAME: string;
	LIMIT_CAPABILITIES: string;
	MESSAGE_QUEUE_DELIVERY_METHOD: string;
	MESSAGE_QUEUE_LIBRARY_NAME: string;
	MESSAGE_QUEUE_NAME: string;
	MESSAGE_QUEUE_SEVERITY: number;
	NETSERVER_DISABLED: string;
	NO_PASSWORD_INDICATOR: string;
	OBJECT_AUDITING_VALUE: string;
	OUTPUT_QUEUE_LIBRARY_NAME: string;
	OUTPUT_QUEUE_NAME: string;
	PASSWORD_CHANGE_DATE: string;
	PASSWORD_EXPIRATION_INTERVAL: number;
	PREVIOUS_SIGNON: string;
	SET_PASSWORD_TO_EXPIRE: string;
	SIGN_ON_ATTEMPTS_NOT_VALID: number;
	SPECIAL_AUTHORITIES: string | null;
	STATUS: string;
	TEXT_DESCRIPTION: string;
	USER_DEFAULT_PASSWORD: string | null;
	USER_EXPIRATION_INTERVAL: number;
	USER_ID_NUMBER: bigint;
};

export type IbmiAuthorizationListInterface = {
	AUTHORIZATION_LIST: string;
	AUTHORIZATION_LIST_MANAGEMENT: string;
	AUTHORIZATION_NAME: string;
	DATA_ADD: string;
	DATA_DELETE: string;
	DATA_EXECUTE: string;
	DATA_READ: string;
	DATA_UPDATE: string;
	OBJECT_ALTER: string;
	OBJECT_AUTHORITY: string;
	OBJECT_EXISTENCE: string;
	OBJECT_MANAGEMENT: string;
	OBJECT_OPERATIONAL: string;
	OBJECT_REFERENCE: string;
	OWNER: string;
	TEXT_DESCRIPTION: string | null;
};

export type ClBooSame = '*NO' | '*SAME' | '*YES';
export type ClBooSameSysval = '*NO' | '*SAME' | '*SYSVAL' | '*YES';
export type UnQualifiedObject = {
	library: string | undefined; // *LIBL, *CURLIB
	object: string;
};
export type ParametersCHGUSRPRF = {
	// TODO: These comments are out of order. They need to be aligned using this URL:
	// ? https://www.ibm.com/docs/en/i/7.3?topic=ssw_ibm_i_73/cl/chgusrprf.htm
	// *SAME, *NONE
	ACGCDE?: string;
	ASTLVL?: '*ADVANCED' | '*BASIC' | '*INTERMED' | '*SAME' | '*SYSVAL';
	// *SAME, *WRKSTN, *DEV
	ATNPGM?: UnQualifiedObject;
	// *SAME, *SYSVAL
	CCSID?: number | '*HEX' | '*SAME' | '*SYSVAL';
	CHRIDCTL?: '*DEVD' | '*JOBCCSID' | '*SAME' | '*SYSVAL';
	// *SAME, *SYSVAL
	CNTRYID?: string;
	CURLIB?: UnQualifiedObject;
	// *SAME, *USRPRF
	DLVRY?: '*BREAK' | '*DFT' | '*HOLD' | '*NOTIFY' | '*SAME';
	// *SAME, *BLANK
	DOCPWD?: string;
	DSPSGNINF?: ClBooSameSysval;
	// *SAME, *USRPRF, Path name
	EIMASSOC?:
		| '*NOCHG'
		| {
				ACTION: '*ADD' | '*REMOVE' | '*REPLACE'; // *USRPRF
				ASSOC: '*ADMIN' | '*ALL' | '*SOURCE' | '*TARGET' | '*TGTSRC';
				CREATE: '*CRTEIMID' | '*NOCRTEIMID';
				EIMID: string;
		  };
	// 1-4294967294
	GID?: number | '*GEN' | '*NONE' | '*SAME';
	GRPAUT?: '*ALL' | '*CHANGE' | '*EXCLUDE' | '*NONE' | '*SAME' | '*USE';
	GRPAUTTYP?: '*PGP' | '*PRIVATE' | '*SAME';
	// *SAME
	GRPPRF?: string;
	// 1-4294967294
	HOMEDIR?: string;
	// *SAME, *NONE
	INLMNU?: UnQualifiedObject;
	// *SAME, *CRTDFT
	INLPGM?: UnQualifiedObject;
	// 0-9
	JOBD?: UnQualifiedObject;
	// *SAME, *SYSVAL, *YES, *NO, 0-9
	KBDBUF?: string;
	// *SAME, *SYSVAL, *HEX, *LANGIDSHR, *LANGIDUNQ
	LANGID?: string;
	// *SAME, *SYSVAL, *NONE, 1-99
	LCLPWDMGT?: ClBooSame;
	// *SAME, *SIGNOFF
	LMTCPB?: '*NO' | '*PARTIAL' | '*SAME' | '*YES';
	LMTDEVSSN?: number | string;
	// *SAME, *SYSVAL, *NONE
	// *CCSID, *DATFMT, *DATSEP, *DECFMT, *SRTSEQ, *TIMSEP
	LOCALE?: string;
	// *SAME, *NOMAX
	MAXSTG?: number | string;
	// *SAME, *SYSVAL, *NO, *TYPEAHEAD, *YES
	MAXSTGLRG?: string;
	// *SAME, *NONE
	MSGQ?: UnQualifiedObject;
	// *SAME, *WRKSTN, *SYSVAL
	OUTQ?: UnQualifiedObject;
	// *SAME, *NONE
	OWNER?: '*SAME' | '*SYSVAL' | '*USRPRF';
	PASSWORD?: string;
	// 0-99
	PRTDEV?: string;
	// *SAME, *NOMAX, Integer
	PTYLMT?: number | '*SAME';
	// *SAME, *SYSVAL, *NOMAX, 1-366
	PWDCHGBLK?: number | string;
	// *SAME, *NONE
	PWDEXP?: ClBooSame;
	PWDEXPITV?: number | string;
	SETJOBATR?: string[];
	SEV?: number | '*SAME';
	// *SAME, *BLANK
	SPCAUT?: string[];
	// *SAME, *USRCLS, *NONE
	// *ALLOBJ, *AUDIT, *IOSYSCFG, *JOBCTL, *SAVSYS, *SECADM, *SERVICE, *SPLCTL
	SPCENV?: '*NONE' | '*S36' | '*SAME' | '*SYSVAL';
	// *SAME, *SYSVAL, *NONE, *ASSIST
	SRTSEQ?: UnQualifiedObject;
	STATUS?: '*DISABLED' | '*ENABLED' | '*SAME';
	SUPGRPPRF?: string[];
	TEXT?: string; // *SAME, *NONE
	// *CLKWD, *EXPERT, *ROLLKEY, *NOSTSMSG, *STSMSG, *HLPFULL, *PRTMSG
	UID?: number | '*SAME';
	USRCLS?: '*PGMR' | '*SAME' | '*SECADM' | '*SECOFR' | '*SYSOPR' | '*USER';
	USREXPDATE?: Date | '*NONE' | '*SAME' | '*USREXPITV';
	USREXPITV?: number;
	// *SAME, *SYSVAL, *NONE, *C, *POSIX, Path name
	USROPT?: string[];
	USRPRF: string; // 1-366
};
