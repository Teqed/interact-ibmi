/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryOdbc } from '../../util/odbc/odbc-util.js';

export default async () => {
	const jobInfo = (await queryOdbc(`SELECT \
ORDINAL_POSITION, JOB_NAME, JOB_NAME_SHORT, \
JOB_USER, JOB_NUMBER, SUBSYSTEM, \
SUBSYSTEM_LIBRARY_NAME, AUTHORIZATION_NAME, \
TEMPORARY_STORAGE, CPU_TIME, TOTAL_DISK_IO_COUNT, \
JOB_DESCRIPTION, JOB_DESCRIPTION_LIBRARY, \
JOB_QUEUE, JOB_QUEUE_LIBRARY, OUTPUT_QUEUE, \
OUTPUT_QUEUE_LIBRARY, CCSID, JOB_ENTERED_SYSTEM_TIME, \
CLIENT_IP_ADDRESS \
FROM TABLE(QSYS2.ACTIVE_JOB_INFO(JOB_NAME_FILTER =>'*'))`)) as any;

	const jobName = jobInfo[0].JOB_NAME as unknown as string;

	const jobMessages = (await queryOdbc(`select \
MESSAGE_ID, \
MESSAGE_TYPE, \
MESSAGE_TIMESTAMP, \
FROM_PROGRAM, \
MESSAGE_TEXT, \
MESSAGE_SECOND_LEVEL_TEXT \
from table(qsys2.joblog_info('${jobName}'))`)) as any;

	// Log each element of the array
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	jobMessages.forEach((element: any) => {
		console.log(element);
	});

	return 0;
};
