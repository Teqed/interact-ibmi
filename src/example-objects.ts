/* eslint-disable unicorn/no-null */
import { type NodeOdbcError } from 'odbc';
import { type OdbcError } from 'odbc';
import { type IbmiUserInterface, type BriefIbmiUserInterface } from './util/types.js';
/* Create an object named fromUser that has the same properties as fromUserRaw[0]. */

export const testUser: IbmiUserInterface = {
	ACCOUNTING_CODE: null,
	ASSISTANCE_LEVEL: `*INTERMED`,
	ATTENTION_KEY_HANDLING_PROGRAM_LIBRARY_NAME: `QSYS`,
	ATTENTION_KEY_HANDLING_PROGRAM_NAME: `QEZMAIN`,
	AUTHORITY_COLLECTION_ACTIVE: `NO`,
	AUTHORITY_COLLECTION_REPOSITORY_EXISTS: `NO`,
	AUTHORIZATION_NAME: `TEQ`,
	BLOCK_PASSWORD_CHANGE: `*SYSVAL`,
	CHARACTER_CODE_SET_ID: `QCCSID`,
	CHARACTER_IDENTIFIER_CONTROL: `*SYSVAL`,
	COUNTRY_OR_REGION_ID: `*SYSVAL`,
	CREATION_TIMESTAMP: `2021-08-16 22:13:58.000000`,
	CURRENT_LIBRARY_NAME: `TEQ1`,
	DATE_PASSWORD_EXPIRES: `2022-10-27 00:00:00.000000`,
	DAYS_UNTIL_PASSWORD_EXPIRES: null,
	DAYS_USED_COUNT: 18,
	DIGITAL_CERTIFICATE_INDICATOR: `NO`,
	DISPLAY_SIGNON_INFORMATION: `*SYSVAL`,
	GROUP_AUTHORITY: `*NONE`,
	GROUP_AUTHORITY_TYPE: `*PRIVATE`,
	GROUP_ID_NUMBER: 0n,
	GROUP_MEMBER_INDICATOR: `NO`,
	GROUP_PROFILE_NAME: `*NONE`,
	HIGHEST_SCHEDULING_PRIORITY: `5`,
	HOME_DIRECTORY: `/home/TEQ`,
	INITIAL_MENU_LIBRARY_NAME: `*LIBL`,
	INITIAL_MENU_NAME: `MAIN`,
	INITIAL_PROGRAM_LIBRARY_NAME: `PUB400SYS`,
	INITIAL_PROGRAM_NAME: `SETLANG`,
	JOB_DESCRIPTION_LIBRARY_NAME: `QGPL`,
	JOB_DESCRIPTION_NAME: `TEQ`,
	KEYBOARD_BUFFERING: `*SYSVAL`,
	LANGUAGE_ID: `ENU`,
	LAST_RESET_TIMESTAMP: null,
	LAST_USED_TIMESTAMP: `2022-08-23 00:00:00.000000`,
	LIMIT_CAPABILITIES: `*NO`,
	LIMIT_DEVICE_SESSIONS: `*SYSVAL`,
	LOCAL_PASSWORD_MANAGEMENT: `YES`,
	LOCALE_JOB_ATTRIBUTES: `*SYSVAL    `,
	LOCALE_PATH_NAME: `*SYSVAL`,
	MAXIMUM_ALLOWED_STORAGE: 400_000n,
	MAXIMUM_SIGN_ON_ATTEMPTS: `*SYSVAL`,
	MESSAGE_QUEUE_DELIVERY_METHOD: `*BREAK`,
	MESSAGE_QUEUE_LIBRARY_NAME: `QUSRSYS`,
	MESSAGE_QUEUE_NAME: `TEQ`,
	MESSAGE_QUEUE_SEVERITY: 0,
	NETSERVER_DISABLED: `NO`,
	NO_PASSWORD_INDICATOR: `NO`,
	OBJECT_AUDITING_VALUE: `*NOTAVL`,
	OUTPUT_QUEUE_LIBRARY_NAME: `QGPL`,
	OUTPUT_QUEUE_NAME: `TEQ`,
	OWNER: `*USRPRF`,
	PASE_SHELL_PATH: null,
	PASSWORD_CHANGE_DATE: `2022-04-30 00:18:47.000000`,
	PASSWORD_EXPIRATION_INTERVAL: 0,
	PASSWORD_LEVEL_0_1: `NO`,
	PASSWORD_LEVEL_2_3: `YES`,
	PASSWORD_LEVEL_4: `YES`,
	PREVIOUS_SIGNON: `2022-08-23 16:32:06.000000`,
	PRINT_DEVICE: `PRT01`,
	SET_PASSWORD_TO_EXPIRE: `NO`,
	SIGN_ON_ATTEMPTS_NOT_VALID: 0,
	SIZE: 200_704,
	SORT_SEQUENCE_TABLE_LIBRARY_NAME: null,
	SORT_SEQUENCE_TABLE_NAME: `*SYSVAL`,
	SPECIAL_AUTHORITIES: null,
	SPECIAL_ENVIRONMENT: `*SYSVAL`,
	STATUS: `*ENABLED`,
	STORAGE_USED: 11_064n,
	SUPPLEMENTAL_GROUP_COUNT: 0,
	SUPPLEMENTAL_GROUP_LIST: null,
	TEXT_DESCRIPTION: `Quilling,Timothy`,
	USER_ACTION_AUDIT_LEVEL: null,
	USER_CLASS_NAME: `*PGMR`,
	USER_CREATOR: `JOBMANAGER`,
	USER_DEFAULT_PASSWORD: null,
	USER_ENTITLEMENT_REQUIRED: `YES`,
	USER_EXPIRATION_ACTION: `*NONE`,
	USER_EXPIRATION_DATE: null,
	USER_EXPIRATION_INTERVAL: 0,
	USER_ID_NUMBER: 24_694n,
	USER_OPTIONS: `*CLKW      *HLPFULL   `,
	USER_OWNER: `JOBMANAGER`,
};

export const testUser2: BriefIbmiUserInterface = {
	ACCOUNTING_CODE: null,
	AUTHORIZATION_NAME: `TEQ`,
	DAYS_UNTIL_PASSWORD_EXPIRES: null,
	INITIAL_MENU_LIBRARY_NAME: `*LIBL`,
	INITIAL_MENU_NAME: `MAIN`,
	INITIAL_PROGRAM_LIBRARY_NAME: `PUB400SYS`,
	INITIAL_PROGRAM_NAME: `SETLANG`,
	LIMIT_CAPABILITIES: `*NO`,
	MESSAGE_QUEUE_DELIVERY_METHOD: `*BREAK`,
	MESSAGE_QUEUE_LIBRARY_NAME: `QUSRSYS`,
	MESSAGE_QUEUE_NAME: `TEQ`,
	MESSAGE_QUEUE_SEVERITY: 0,
	NETSERVER_DISABLED: `NO`,
	NO_PASSWORD_INDICATOR: `NO`,
	OBJECT_AUDITING_VALUE: `*NOTAVL`,
	OUTPUT_QUEUE_LIBRARY_NAME: `QGPL`,
	OUTPUT_QUEUE_NAME: `TEQ`,
	PASSWORD_CHANGE_DATE: `2022-04-30 00:18:47.000000`,
	PASSWORD_EXPIRATION_INTERVAL: 0,
	PREVIOUS_SIGNON: `2022-08-23 16:32:06.000000`,
	SET_PASSWORD_TO_EXPIRE: `NO`,
	SIGN_ON_ATTEMPTS_NOT_VALID: 0,
	SPECIAL_AUTHORITIES: null,
	STATUS: `*ENABLED`,
	TEXT_DESCRIPTION: `Quilling,Timothy`,
	USER_DEFAULT_PASSWORD: null,
	USER_EXPIRATION_INTERVAL: 0,
	USER_ID_NUMBER: 24_694n,
};

export const exampleError: NodeOdbcError = {
	message: `[odbc] Error executing the sql statement`,
	name: `Error: [odbc] Error executing the sql statement`,
	odbcErrors: [
		{
			code: 30_038,
			message: `[IBM][System i Access ODBC Driver]Invalid string or buffer length.`,
			state: `HY090`,
		},
	] as OdbcError[],
	stack: `Error: [odbc] Error executing the sql statement`,
};
export const exampleError2: NodeOdbcError = {
	message: `[odbc] Error executing the sql statement`,
	name: `Error: [odbc] Error executing the sql statement`,
	odbcErrors: [
		{
			code: -199,
			// eslint-disable-next-line max-len
			message: `[IBM][System i Access ODBC Driver][DB2 for i5/OS]SQL0199 - Keyword QUERY not expected. Valid tokens: FOR USE SKIP WAIT WITH FETCH LIMIT ORDER UNION EXCEPT OFFSET.`,
			state: `42000`,
		},
	] as OdbcError[],
	stack: `Error: [odbc] Error executing the sql statement`,
};
