/* eslint-disable unicorn/no-await-expression-member */
import { queryOdbc } from './odbc-util.js';

let jobInfo:
	| {
			AUTHORIZATION_NAME: string;
			CCSID: number;
			CLIENT_IP_ADDRESS: string;
			CPU_TIME: number;
			JOB_DESCRIPTION: string;
			JOB_DESCRIPTION_LIBRARY: string;
			JOB_ENTERED_SYSTEM_TIME: string;
			JOB_NAME: string;
			JOB_NAME_SHORT: string;
			JOB_NUMBER: number;
			JOB_QUEUE: string;
			JOB_QUEUE_LIBRARY: string;
			JOB_USER: string;
			ORDINAL_POSITION: number;
			OUTPUT_QUEUE: string;
			OUTPUT_QUEUE_LIBRARY: string;
			SUBSYSTEM: string;
			SUBSYSTEM_LIBRARY_NAME: string;
			TEMPORARY_STORAGE: number;
			TOTAL_DISK_IO_COUNT: number;
	  }
	| undefined;

export default async function () {
	if (!jobInfo) {
		const jobInfoInner = (
			await queryOdbc(`SELECT \
	ORDINAL_POSITION, JOB_NAME, JOB_NAME_SHORT, \
	JOB_USER, JOB_NUMBER, SUBSYSTEM, \
	SUBSYSTEM_LIBRARY_NAME, AUTHORIZATION_NAME, \
	TEMPORARY_STORAGE, CPU_TIME, TOTAL_DISK_IO_COUNT, \
	JOB_DESCRIPTION, JOB_DESCRIPTION_LIBRARY, \
	JOB_QUEUE, JOB_QUEUE_LIBRARY, OUTPUT_QUEUE, \
	OUTPUT_QUEUE_LIBRARY, CCSID, JOB_ENTERED_SYSTEM_TIME, \
	CLIENT_IP_ADDRESS \
	FROM TABLE(QSYS2.ACTIVE_JOB_INFO(JOB_NAME_FILTER =>'*'))`)
		)[0] as unknown as {
			AUTHORIZATION_NAME: string;
			CCSID: number;
			CLIENT_IP_ADDRESS: string;
			CPU_TIME: number;
			JOB_DESCRIPTION: string;
			JOB_DESCRIPTION_LIBRARY: string;
			JOB_ENTERED_SYSTEM_TIME: string;
			JOB_NAME: string;
			JOB_NAME_SHORT: string;
			JOB_NUMBER: number;
			JOB_QUEUE: string;
			JOB_QUEUE_LIBRARY: string;
			JOB_USER: string;
			ORDINAL_POSITION: number;
			OUTPUT_QUEUE: string;
			OUTPUT_QUEUE_LIBRARY: string;
			SUBSYSTEM: string;
			SUBSYSTEM_LIBRARY_NAME: string;
			TEMPORARY_STORAGE: number;
			TOTAL_DISK_IO_COUNT: number;
		};
		if (!jobInfo) {
			jobInfo = jobInfoInner;
		}
	}

	const jobName = jobInfo.JOB_NAME;
	return jobName;
}
