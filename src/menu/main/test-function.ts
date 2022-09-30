import printJobLog from '../../util/odbc/print-job-log.js';

export default async () => {
	console.time();
	await printJobLog();
	console.timeEnd();
};
