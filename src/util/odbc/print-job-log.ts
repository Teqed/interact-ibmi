import chalk from 'chalk';
import getJobInfo from './get-job-info.js';
import getJobMessages from './get-job-messages.js';

export default async function () {
	const jobName = await getJobInfo();
	const jobMessages = await getJobMessages(jobName);
	// Log the job messages to the console.
	// Color the message based on MESSAGE_TYPE using chalk.
	// Use red for 'ESCAPE', and 'NOTIFY'.
	// Use yellow for 'INQUIRY', and 'REQUEST'.
	// Use green for 'COMPLETION' and 'REPLY'.
	// Use white for 'INFORMATIONAL', 'SCOPE', and 'SENDER'.
	// Print the message in the format:
	// MESSAGE_TIMESTAMP - MESSAGE_ID - MESSAGE_TEXT
	jobMessages.forEach(message => {
		switch (message.MESSAGE_TYPE) {
			case `ESCAPE`:
			case `NOTIFY`:
				console.log(
					chalk.red(
						`${message.MESSAGE_TIMESTAMP} - ${message.MESSAGE_ID} - ${message.MESSAGE_TEXT}`,
					),
				);
				break;
			case `INQUIRY`:
			case `REQUEST`:
				console.log(
					chalk.yellow(
						`${message.MESSAGE_TIMESTAMP} - ${message.MESSAGE_ID} - ${message.MESSAGE_TEXT}`,
					),
				);
				break;
			case `COMPLETION`:
			case `REPLY`:
				console.log(
					chalk.green(
						`${message.MESSAGE_TIMESTAMP} - ${message.MESSAGE_ID} - ${message.MESSAGE_TEXT}`,
					),
				);
				break;
			case `INFORMATIONAL`:
			case `SCOPE`:
			case `SENDER`:
				console.log(
					chalk.white(
						`${message.MESSAGE_TIMESTAMP} - ${message.MESSAGE_ID} - ${message.MESSAGE_TEXT}`,
					),
				);
				break;
			default:
				console.log(
					chalk.white(
						`${message.MESSAGE_TIMESTAMP} - ${message.MESSAGE_ID} - ${message.MESSAGE_TEXT}`,
					),
				);
				break;
		}
	});
}
