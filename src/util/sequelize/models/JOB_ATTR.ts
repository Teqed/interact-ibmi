/* eslint-disable unicorn/filename-case */

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable canonical/sort-keys */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable typescript-sort-keys/interface */
/* eslint-disable canonical/filename-match-regex */
import type * as Sequelize from '@sequelize/core';
import { type Optional, DataTypes, Model } from '@sequelize/core';

export type JOB_ATTRAttributes = {
	JOB?: string;
	JOB_STATUS?: string;
	JOB_TYPE?: string;
	JOB_SUBTYPE?: string;
	JOB_NAME?: string;
	JOB_USER_NAME?: string;
	JOB_NBR?: string;
	JOB_DATE?: string;
	DATE_ENTERED_SYSTEM?: string;
	DATE_JOB_ACTIVE?: string;
	JOB_GRPPRF?: string;
	JOB_CURUSR?: string;
	JOBD_NAME?: string;
	JOBD_LIB?: string;
	MODE_NAME?: string;
	LOGCLPGM?: string;
	BRKMSGHANDLING?: string;
	STSMSGHANDLING?: string;
	DECFMT?: string;
	DATESEP?: string;
	DATEFMT?: string;
	TIMESEP?: string;
	TIME_ZONE?: string;
	DAYOFWEEK?: string;
	LANGUAGE_ID?: string;
	COUNTRY_ID?: string;
	CCSID?: number;
	DFTCCSID?: number;
	SBMJOB_NAME?: string;
	SBMJOB_USER?: string;
	SBMJOB_NBR?: string;
	JOB_SBSNAME?: string;
	JOB_SBSLIB?: string;
	DEVNAME?: string;
	CLIENT_IP?: string;
	END_SEV?: number;
	LOG_LEVEL?: number;
	LOG_SEV?: number;
	LOG_MSGTEXTLVL?: string;
	JOB_SWITCHES?: string;
	JOBLOG_OUTPUT?: string;
	ALLOW_MULTIPLE_THREADS?: string;
};

export type JOB_ATTROptionalAttributes =
	| 'ALLOW_MULTIPLE_THREADS'
	| 'BRKMSGHANDLING'
	| 'CCSID'
	| 'CLIENT_IP'
	| 'COUNTRY_ID'
	| 'DATE_ENTERED_SYSTEM'
	| 'DATE_JOB_ACTIVE'
	| 'DATEFMT'
	| 'DATESEP'
	| 'DAYOFWEEK'
	| 'DECFMT'
	| 'DEVNAME'
	| 'DFTCCSID'
	| 'END_SEV'
	| 'JOB_CURUSR'
	| 'JOB_DATE'
	| 'JOB_GRPPRF'
	| 'JOB_NAME'
	| 'JOB_NBR'
	| 'JOB_SBSLIB'
	| 'JOB_SBSNAME'
	| 'JOB_STATUS'
	| 'JOB_SUBTYPE'
	| 'JOB_SWITCHES'
	| 'JOB_TYPE'
	| 'JOB_USER_NAME'
	| 'JOB'
	| 'JOBD_LIB'
	| 'JOBD_NAME'
	| 'JOBLOG_OUTPUT'
	| 'LANGUAGE_ID'
	| 'LOG_LEVEL'
	| 'LOG_MSGTEXTLVL'
	| 'LOG_SEV'
	| 'LOGCLPGM'
	| 'MODE_NAME'
	| 'SBMJOB_NAME'
	| 'SBMJOB_NBR'
	| 'SBMJOB_USER'
	| 'STSMSGHANDLING'
	| 'TIME_ZONE'
	| 'TIMESEP';
export type JOB_ATTRCreationAttributes = Optional<JOB_ATTRAttributes, JOB_ATTROptionalAttributes>;

export class JOB_ATTR
	extends Model<JOB_ATTRAttributes, JOB_ATTRCreationAttributes>
	implements JOB_ATTRAttributes
{
	declare JOB?: string;

	declare JOB_STATUS?: string;

	declare JOB_TYPE?: string;

	declare JOB_SUBTYPE?: string;

	declare JOB_NAME?: string;

	declare JOB_USER_NAME?: string;

	declare JOB_NBR?: string;

	declare JOB_DATE?: string;

	declare DATE_ENTERED_SYSTEM?: string;

	declare DATE_JOB_ACTIVE?: string;

	declare JOB_GRPPRF?: string;

	declare JOB_CURUSR?: string;

	declare JOBD_NAME?: string;

	declare JOBD_LIB?: string;

	declare MODE_NAME?: string;

	declare LOGCLPGM?: string;

	declare BRKMSGHANDLING?: string;

	declare STSMSGHANDLING?: string;

	declare DECFMT?: string;

	declare DATESEP?: string;

	declare DATEFMT?: string;

	declare TIMESEP?: string;

	declare TIME_ZONE?: string;

	declare DAYOFWEEK?: string;

	declare LANGUAGE_ID?: string;

	declare COUNTRY_ID?: string;

	declare CCSID?: number;

	declare DFTCCSID?: number;

	declare SBMJOB_NAME?: string;

	declare SBMJOB_USER?: string;

	declare SBMJOB_NBR?: string;

	declare JOB_SBSNAME?: string;

	declare JOB_SBSLIB?: string;

	declare DEVNAME?: string;

	declare CLIENT_IP?: string;

	declare END_SEV?: number;

	declare LOG_LEVEL?: number;

	declare LOG_SEV?: number;

	declare LOG_MSGTEXTLVL?: string;

	declare JOB_SWITCHES?: string;

	declare JOBLOG_OUTPUT?: string;

	declare ALLOW_MULTIPLE_THREADS?: string;

	static initModel(sequelize: Sequelize.Sequelize): typeof JOB_ATTR {
		return JOB_ATTR.init(
			{
				JOB: {
					type: DataTypes.STRING,
					primaryKey: true,
					allowNull: true,
				},
				JOB_STATUS: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				JOB_TYPE: {
					type: DataTypes.CHAR,
					allowNull: true,
				},
				JOB_SUBTYPE: {
					type: DataTypes.CHAR,
					allowNull: true,
				},
				JOB_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				JOB_USER_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				JOB_NBR: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				JOB_DATE: {
					type: DataTypes.DATEONLY,
					allowNull: true,
				},
				DATE_ENTERED_SYSTEM: {
					type: DataTypes.TIME,
					allowNull: true,
				},
				DATE_JOB_ACTIVE: {
					type: DataTypes.TIME,
					allowNull: true,
				},
				JOB_GRPPRF: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				JOB_CURUSR: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				JOBD_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				JOBD_LIB: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				MODE_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				LOGCLPGM: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				BRKMSGHANDLING: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				STSMSGHANDLING: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				DECFMT: {
					type: DataTypes.CHAR,
					allowNull: true,
				},
				DATESEP: {
					type: DataTypes.CHAR,
					allowNull: true,
				},
				DATEFMT: {
					type: DataTypes.CHAR,
					allowNull: true,
				},
				TIMESEP: {
					type: DataTypes.CHAR,
					allowNull: true,
				},
				TIME_ZONE: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				DAYOFWEEK: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				LANGUAGE_ID: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				COUNTRY_ID: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				CCSID: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				DFTCCSID: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				SBMJOB_NAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				SBMJOB_USER: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				SBMJOB_NBR: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				JOB_SBSNAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				JOB_SBSLIB: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				DEVNAME: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				CLIENT_IP: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				END_SEV: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				LOG_LEVEL: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				LOG_SEV: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				LOG_MSGTEXTLVL: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				JOB_SWITCHES: {
					type: DataTypes.CHAR,
					allowNull: true,
				},
				JOBLOG_OUTPUT: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				ALLOW_MULTIPLE_THREADS: {
					type: DataTypes.STRING,
					allowNull: true,
				},
			},
			{
				sequelize,
				tableName: `JOB_ATTR`,
				schema: `IQUERY`,
				timestamps: false,
			},
		);
	}
}
