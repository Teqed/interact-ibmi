import chalk from 'chalk';
import getJobInfo from './get-job-info.js';
import getJobMessages from './get-job-messages.js';

export default async function () {
	const jobName = await getJobInfo(); // TODO - Get the job name at initialization.
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
		const severityMessageString = `Sev:${message.SEVERITY}`;
		let coloredSeverity = chalk.whiteBright(severityMessageString);
		switch (message.SEVERITY) {
			case 0:
				coloredSeverity = chalk.whiteBright(`Sev: 0`);
				break;
			case 10:
				coloredSeverity = chalk.green(severityMessageString);
				break;
			case 20:
				coloredSeverity = chalk.yellow(severityMessageString);
				break;
			case 30:
				coloredSeverity = chalk.red(severityMessageString);
				break;
			case 40:
				coloredSeverity = chalk.red.bgBlack(severityMessageString);
				break;
			default:
				coloredSeverity = chalk.whiteBright(severityMessageString);
				break;
		}

		const trimmedMessageTimestamp = message.MESSAGE_TIMESTAMP.slice(
			0,
			Math.max(0, message.MESSAGE_TIMESTAMP.indexOf(`.`)),
		);
		// eslint-disable-next-line max-len
		const messageString = `${coloredSeverity} - ${trimmedMessageTimestamp} - ${message.MESSAGE_ID} - ${message.MESSAGE_TEXT}`;
		switch (message.MESSAGE_TYPE) {
			case `ESCAPE`:
				console.log(chalk.red(messageString));
				break;
			case `NOTIFY`:
				console.log(chalk.redBright(messageString));
				break;
			case `INQUIRY`:
				console.log(chalk.yellowBright(messageString));
				break;
			case `REQUEST`:
				console.log(chalk.yellow(messageString));
				break;
			case `COMPLETION`:
				console.log(chalk.greenBright(messageString));
				break;
			case `REPLY`:
				console.log(chalk.green(messageString));
				break;
			case `INFORMATIONAL`:
				console.log(chalk.blueBright(messageString));
				break;
			case `SCOPE`:
			case `SENDER`:
				console.log(chalk.grey(messageString));
				break;
			default:
				console.log(chalk.white(messageString));
				break;
		}
	});
}
