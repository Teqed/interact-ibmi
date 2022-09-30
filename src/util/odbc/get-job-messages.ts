/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { queryOdbc } from './odbc-util.js';

export default async function (jobName: string) {
	const query = (await queryOdbc(`select \
MESSAGE_ID, \
MESSAGE_TYPE, \
MESSAGE_TIMESTAMP, \
FROM_PROGRAM, \
MESSAGE_TEXT, \
MESSAGE_SECOND_LEVEL_TEXT \
from table(qsys2.joblog_info('${jobName}'))`)) as any;

	// For each element in the array, push it to the jobMessages2 array.
	const jobMessages: Array<{
		FROM_PROGRAM: string;
		MESSAGE_ID: string;
		MESSAGE_SECOND_LEVEL_TEXT: string;
		MESSAGE_TEXT: string;
		MESSAGE_TIMESTAMP: string;
		MESSAGE_TYPE: string;
	}> = [];
	query.forEach(
		(element: {
			FROM_PROGRAM: string;
			MESSAGE_ID: string;
			MESSAGE_SECOND_LEVEL_TEXT: string;
			MESSAGE_TEXT: string;
			MESSAGE_TIMESTAMP: string;
			MESSAGE_TYPE: string;
		}) => {
			jobMessages.push(element);
		},
	);

	return jobMessages;
}
