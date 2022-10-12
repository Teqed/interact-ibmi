/* eslint-disable unicorn/filename-case */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable canonical/sort-keys */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable typescript-sort-keys/interface */
/* eslint-disable canonical/filename-match-regex */
import type * as Sequelize from '@sequelize/core';
import { type Optional, DataTypes, Model } from '@sequelize/core';

export type USER_INFO_BASICAttributes = {
	AUTHORIZATION_NAME?: string;
	PREVIOUS_SIGNON?: string;
	SIGN_ON_ATTEMPTS_NOT_VALID?: number;
	MAXIMUM_SIGN_ON_ATTEMPTS?: string;
	STATUS?: string;
	NETSERVER_DISABLED: string;
	PASSWORD_CHANGE_DATE?: string;
	NO_PASSWORD_INDICATOR?: string;
	PASSWORD_LEVEL_0_1?: string;
	PASSWORD_LEVEL_2_3?: string;
	PASSWORD_LEVEL_4?: string;
	PASSWORD_EXPIRATION_INTERVAL?: number;
	DATE_PASSWORD_EXPIRES?: string;
	DAYS_UNTIL_PASSWORD_EXPIRES?: number;
	SET_PASSWORD_TO_EXPIRE?: string;
	USER_CLASS_NAME?: string;
	SPECIAL_AUTHORITIES?: string;
	GROUP_PROFILE_NAME?: string;
	SUPPLEMENTAL_GROUP_COUNT?: number;
	SUPPLEMENTAL_GROUP_LIST?: string;
	OWNER?: string;
	GROUP_AUTHORITY?: string;
	ASSISTANCE_LEVEL?: string;
	CURRENT_LIBRARY_NAME?: string;
	INITIAL_MENU_NAME?: string;
	INITIAL_MENU_LIBRARY_NAME?: string;
	INITIAL_PROGRAM_NAME?: string;
	INITIAL_PROGRAM_LIBRARY_NAME?: string;
	LIMIT_CAPABILITIES?: string;
	TEXT_DESCRIPTION?: string;
	DISPLAY_SIGNON_INFORMATION?: string;
	LIMIT_DEVICE_SESSIONS?: string;
	KEYBOARD_BUFFERING?: string;
	MAXIMUM_ALLOWED_STORAGE?: number;
	STORAGE_USED?: number;
	HIGHEST_SCHEDULING_PRIORITY?: string;
	JOB_DESCRIPTION_NAME?: string;
	JOB_DESCRIPTION_LIBRARY_NAME?: string;
	ACCOUNTING_CODE?: string;
	MESSAGE_QUEUE_NAME?: string;
	MESSAGE_QUEUE_LIBRARY_NAME?: string;
	MESSAGE_QUEUE_DELIVERY_METHOD?: string;
	MESSAGE_QUEUE_SEVERITY?: number;
	OUTPUT_QUEUE_NAME?: string;
	OUTPUT_QUEUE_LIBRARY_NAME?: string;
	PRINT_DEVICE?: string;
	SPECIAL_ENVIRONMENT?: string;
	ATTENTION_KEY_HANDLING_PROGRAM_NAME?: string;
	ATTENTION_KEY_HANDLING_PROGRAM_LIBRARY_NAME?: string;
	LANGUAGE_ID?: string;
	COUNTRY_OR_REGION_ID?: string;
	CHARACTER_CODE_SET_ID?: string;
	USER_OPTIONS?: string;
	SORT_SEQUENCE_TABLE_NAME?: string;
	SORT_SEQUENCE_TABLE_LIBRARY_NAME?: string;
	OBJECT_AUDITING_VALUE?: string;
	USER_ACTION_AUDIT_LEVEL?: string;
	GROUP_AUTHORITY_TYPE?: string;
	USER_ID_NUMBER?: number;
	GROUP_ID_NUMBER?: number;
	LOCALE_JOB_ATTRIBUTES?: string;
	GROUP_MEMBER_INDICATOR?: string;
	DIGITAL_CERTIFICATE_INDICATOR?: string;
	CHARACTER_IDENTIFIER_CONTROL?: string;
	LOCAL_PASSWORD_MANAGEMENT?: string;
	BLOCK_PASSWORD_CHANGE?: string;
	USER_ENTITLEMENT_REQUIRED?: string;
	USER_EXPIRATION_INTERVAL?: number;
	USER_EXPIRATION_DATE?: string;
	USER_EXPIRATION_ACTION?: string;
	HOME_DIRECTORY?: any;
	LOCALE_PATH_NAME?: any;
	USER_DEFAULT_PASSWORD?: string;
	AUTHORITY_COLLECTION_ACTIVE: string;
	AUTHORITY_COLLECTION_REPOSITORY_EXISTS: string;
	PASE_SHELL_PATH?: string;
};

export type USER_INFO_BASICOptionalAttributes =
	| 'ACCOUNTING_CODE'
	| 'ASSISTANCE_LEVEL'
	| 'ATTENTION_KEY_HANDLING_PROGRAM_LIBRARY_NAME'
	| 'ATTENTION_KEY_HANDLING_PROGRAM_NAME'
	| 'AUTHORITY_COLLECTION_ACTIVE'
	| 'AUTHORITY_COLLECTION_REPOSITORY_EXISTS'
	| 'AUTHORIZATION_NAME'
	| 'BLOCK_PASSWORD_CHANGE'
	| 'CHARACTER_CODE_SET_ID'
	| 'CHARACTER_IDENTIFIER_CONTROL'
	| 'COUNTRY_OR_REGION_ID'
	| 'CURRENT_LIBRARY_NAME'
	| 'DATE_PASSWORD_EXPIRES'
	| 'DAYS_UNTIL_PASSWORD_EXPIRES'
	| 'DIGITAL_CERTIFICATE_INDICATOR'
	| 'DISPLAY_SIGNON_INFORMATION'
	| 'GROUP_AUTHORITY_TYPE'
	| 'GROUP_AUTHORITY'
	| 'GROUP_ID_NUMBER'
	| 'GROUP_MEMBER_INDICATOR'
	| 'GROUP_PROFILE_NAME'
	| 'HIGHEST_SCHEDULING_PRIORITY'
	| 'HOME_DIRECTORY'
	| 'INITIAL_MENU_LIBRARY_NAME'
	| 'INITIAL_MENU_NAME'
	| 'INITIAL_PROGRAM_LIBRARY_NAME'
	| 'INITIAL_PROGRAM_NAME'
	| 'JOB_DESCRIPTION_LIBRARY_NAME'
	| 'JOB_DESCRIPTION_NAME'
	| 'KEYBOARD_BUFFERING'
	| 'LANGUAGE_ID'
	| 'LIMIT_CAPABILITIES'
	| 'LIMIT_DEVICE_SESSIONS'
	| 'LOCAL_PASSWORD_MANAGEMENT'
	| 'LOCALE_JOB_ATTRIBUTES'
	| 'LOCALE_PATH_NAME'
	| 'MAXIMUM_ALLOWED_STORAGE'
	| 'MAXIMUM_SIGN_ON_ATTEMPTS'
	| 'MESSAGE_QUEUE_DELIVERY_METHOD'
	| 'MESSAGE_QUEUE_LIBRARY_NAME'
	| 'MESSAGE_QUEUE_NAME'
	| 'MESSAGE_QUEUE_SEVERITY'
	| 'NETSERVER_DISABLED'
	| 'NO_PASSWORD_INDICATOR'
	| 'OBJECT_AUDITING_VALUE'
	| 'OUTPUT_QUEUE_LIBRARY_NAME'
	| 'OUTPUT_QUEUE_NAME'
	| 'OWNER'
	| 'PASE_SHELL_PATH'
	| 'PASSWORD_CHANGE_DATE'
	| 'PASSWORD_EXPIRATION_INTERVAL'
	| 'PASSWORD_LEVEL_0_1'
	| 'PASSWORD_LEVEL_2_3'
	| 'PASSWORD_LEVEL_4'
	| 'PREVIOUS_SIGNON'
	| 'PRINT_DEVICE'
	| 'SET_PASSWORD_TO_EXPIRE'
	| 'SIGN_ON_ATTEMPTS_NOT_VALID'
	| 'SORT_SEQUENCE_TABLE_LIBRARY_NAME'
	| 'SORT_SEQUENCE_TABLE_NAME'
	| 'SPECIAL_AUTHORITIES'
	| 'SPECIAL_ENVIRONMENT'
	| 'STATUS'
	| 'STORAGE_USED'
	| 'SUPPLEMENTAL_GROUP_COUNT'
	| 'SUPPLEMENTAL_GROUP_LIST'
	| 'TEXT_DESCRIPTION'
	| 'USER_ACTION_AUDIT_LEVEL'
	| 'USER_CLASS_NAME'
	| 'USER_DEFAULT_PASSWORD'
	| 'USER_ENTITLEMENT_REQUIRED'
	| 'USER_EXPIRATION_ACTION'
	| 'USER_EXPIRATION_DATE'
	| 'USER_EXPIRATION_INTERVAL'
	| 'USER_ID_NUMBER'
	| 'USER_OPTIONS';
export type USER_INFO_BASICCreationAttributes = Optional<
	USER_INFO_BASICAttributes,
	USER_INFO_BASICOptionalAttributes
>;

export class USER_INFO_BASIC
	extends Model<USER_INFO_BASICAttributes, USER_INFO_BASICCreationAttributes>
	implements USER_INFO_BASICAttributes
{
	AUTHORIZATION_NAME?: string;

	PREVIOUS_SIGNON?: string;

	SIGN_ON_ATTEMPTS_NOT_VALID?: number;

	MAXIMUM_SIGN_ON_ATTEMPTS?: string;

	STATUS?: string;

	NETSERVER_DISABLED!: string;

	PASSWORD_CHANGE_DATE?: string;

	NO_PASSWORD_INDICATOR?: string;

	PASSWORD_LEVEL_0_1?: string;

	PASSWORD_LEVEL_2_3?: string;

	PASSWORD_LEVEL_4?: string;

	PASSWORD_EXPIRATION_INTERVAL?: number;

	DATE_PASSWORD_EXPIRES?: string;

	DAYS_UNTIL_PASSWORD_EXPIRES?: number;

	SET_PASSWORD_TO_EXPIRE?: string;

	USER_CLASS_NAME?: string;

	SPECIAL_AUTHORITIES?: string;

	GROUP_PROFILE_NAME?: string;

	SUPPLEMENTAL_GROUP_COUNT?: number;

	SUPPLEMENTAL_GROUP_LIST?: string;

	OWNER?: string;

	GROUP_AUTHORITY?: string;

	ASSISTANCE_LEVEL?: string;

	CURRENT_LIBRARY_NAME?: string;

	INITIAL_MENU_NAME?: string;

	INITIAL_MENU_LIBRARY_NAME?: string;

	INITIAL_PROGRAM_NAME?: string;

	INITIAL_PROGRAM_LIBRARY_NAME?: string;

	LIMIT_CAPABILITIES?: string;

	TEXT_DESCRIPTION?: string;

	DISPLAY_SIGNON_INFORMATION?: string;

	LIMIT_DEVICE_SESSIONS?: string;

	KEYBOARD_BUFFERING?: string;

	MAXIMUM_ALLOWED_STORAGE?: number;

	STORAGE_USED?: number;

	HIGHEST_SCHEDULING_PRIORITY?: string;

	JOB_DESCRIPTION_NAME?: string;

	JOB_DESCRIPTION_LIBRARY_NAME?: string;

	ACCOUNTING_CODE?: string;

	MESSAGE_QUEUE_NAME?: string;

	MESSAGE_QUEUE_LIBRARY_NAME?: string;

	MESSAGE_QUEUE_DELIVERY_METHOD?: string;

	MESSAGE_QUEUE_SEVERITY?: number;

	OUTPUT_QUEUE_NAME?: string;

	OUTPUT_QUEUE_LIBRARY_NAME?: string;

	PRINT_DEVICE?: string;

	SPECIAL_ENVIRONMENT?: string;

	ATTENTION_KEY_HANDLING_PROGRAM_NAME?: string;

	ATTENTION_KEY_HANDLING_PROGRAM_LIBRARY_NAME?: string;

	LANGUAGE_ID?: string;

	COUNTRY_OR_REGION_ID?: string;

	CHARACTER_CODE_SET_ID?: string;

	USER_OPTIONS?: string;

	SORT_SEQUENCE_TABLE_NAME?: string;

	SORT_SEQUENCE_TABLE_LIBRARY_NAME?: string;

	OBJECT_AUDITING_VALUE?: string;

	USER_ACTION_AUDIT_LEVEL?: string;

	GROUP_AUTHORITY_TYPE?: string;

	USER_ID_NUMBER?: number;

	GROUP_ID_NUMBER?: number;

	LOCALE_JOB_ATTRIBUTES?: string;

	GROUP_MEMBER_INDICATOR?: string;

	DIGITAL_CERTIFICATE_INDICATOR?: string;

	CHARACTER_IDENTIFIER_CONTROL?: string;

	LOCAL_PASSWORD_MANAGEMENT?: string;

	BLOCK_PASSWORD_CHANGE?: string;

	USER_ENTITLEMENT_REQUIRED?: string;

	USER_EXPIRATION_INTERVAL?: number;

	USER_EXPIRATION_DATE?: string;

	USER_EXPIRATION_ACTION?: string;

	HOME_DIRECTORY?: any;

	LOCALE_PATH_NAME?: any;

	USER_DEFAULT_PASSWORD?: string;

	AUTHORITY_COLLECTION_ACTIVE!: string;

	AUTHORITY_COLLECTION_REPOSITORY_EXISTS!: string;

	PASE_SHELL_PATH?: string;

	static initModel(sequelize: Sequelize.Sequelize): typeof USER_INFO_BASIC {
		return USER_INFO_BASIC.init(
			{
				AUTHORIZATION_NAME: {
					primaryKey: true,
					type: DataTypes.STRING,
					allowNull: true,
				},
				PREVIOUS_SIGNON: {
					type: DataTypes.TIME,
					allowNull: true,
				},
				SIGN_ON_ATTEMPTS_NOT_VALID: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				MAXIMUM_SIGN_ON_ATTEMPTS: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				STATUS: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				NETSERVER_DISABLED: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				PASSWORD_CHANGE_DATE: {
					type: DataTypes.TIME,
					allowNull: true,
				},
				NO_PASSWORD_INDICATOR: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				PASSWORD_LEVEL_0_1: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				PASSWORD_LEVEL_2_3: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				PASSWORD_LEVEL_4: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				PASSWORD_EXPIRATION_INTERVAL: {
					type: DataTypes.SMALLINT,
					allowNull: true,
				},
				DATE_PASSWORD_EXPIRES: {
					type: DataTypes.TIME,
					allowNull: true,
				},
				DAYS_UNTIL_PASSWORD_EXPIRES: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				SET_PASSWORD_TO_EXPIRE: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				USER_CLASS_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				SPECIAL_AUTHORITIES: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				GROUP_PROFILE_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				SUPPLEMENTAL_GROUP_COUNT: {
					type: DataTypes.SMALLINT,
					allowNull: true,
				},
				SUPPLEMENTAL_GROUP_LIST: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				OWNER: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				GROUP_AUTHORITY: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				ASSISTANCE_LEVEL: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				CURRENT_LIBRARY_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				INITIAL_MENU_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				INITIAL_MENU_LIBRARY_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				INITIAL_PROGRAM_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				INITIAL_PROGRAM_LIBRARY_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				LIMIT_CAPABILITIES: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				TEXT_DESCRIPTION: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				DISPLAY_SIGNON_INFORMATION: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				LIMIT_DEVICE_SESSIONS: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				KEYBOARD_BUFFERING: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				MAXIMUM_ALLOWED_STORAGE: {
					type: DataTypes.BIGINT,
					allowNull: true,
				},
				STORAGE_USED: {
					type: DataTypes.BIGINT,
					allowNull: true,
				},
				HIGHEST_SCHEDULING_PRIORITY: {
					type: DataTypes.CHAR,
					allowNull: true,
				},
				JOB_DESCRIPTION_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				JOB_DESCRIPTION_LIBRARY_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				ACCOUNTING_CODE: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				MESSAGE_QUEUE_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				MESSAGE_QUEUE_LIBRARY_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				MESSAGE_QUEUE_DELIVERY_METHOD: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				MESSAGE_QUEUE_SEVERITY: {
					type: DataTypes.SMALLINT,
					allowNull: true,
				},
				OUTPUT_QUEUE_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				OUTPUT_QUEUE_LIBRARY_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				PRINT_DEVICE: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				SPECIAL_ENVIRONMENT: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				ATTENTION_KEY_HANDLING_PROGRAM_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				ATTENTION_KEY_HANDLING_PROGRAM_LIBRARY_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				LANGUAGE_ID: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				COUNTRY_OR_REGION_ID: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				CHARACTER_CODE_SET_ID: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				USER_OPTIONS: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				SORT_SEQUENCE_TABLE_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				SORT_SEQUENCE_TABLE_LIBRARY_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				OBJECT_AUDITING_VALUE: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				USER_ACTION_AUDIT_LEVEL: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				GROUP_AUTHORITY_TYPE: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				USER_ID_NUMBER: {
					type: DataTypes.BIGINT,
					allowNull: true,
				},
				GROUP_ID_NUMBER: {
					type: DataTypes.BIGINT,
					allowNull: true,
				},
				LOCALE_JOB_ATTRIBUTES: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				GROUP_MEMBER_INDICATOR: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				DIGITAL_CERTIFICATE_INDICATOR: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				CHARACTER_IDENTIFIER_CONTROL: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				LOCAL_PASSWORD_MANAGEMENT: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				BLOCK_PASSWORD_CHANGE: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				USER_ENTITLEMENT_REQUIRED: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				USER_EXPIRATION_INTERVAL: {
					type: DataTypes.SMALLINT,
					allowNull: true,
				},
				USER_EXPIRATION_DATE: {
					type: DataTypes.TIME,
					allowNull: true,
				},
				USER_EXPIRATION_ACTION: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				HOME_DIRECTORY: {
					type: `VARG`,
					allowNull: true,
				},
				LOCALE_PATH_NAME: {
					type: `VARG`,
					allowNull: true,
				},
				USER_DEFAULT_PASSWORD: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				AUTHORITY_COLLECTION_ACTIVE: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				AUTHORITY_COLLECTION_REPOSITORY_EXISTS: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				PASE_SHELL_PATH: {
					type: DataTypes.STRING,
					allowNull: true,
				},
			},
			{
				sequelize,
				tableName: `USER_INFO_BASIC`,
				schema: `QSYS2`,
				timestamps: false,
			},
		);
	}
}
