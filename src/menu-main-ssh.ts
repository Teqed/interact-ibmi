import ora from 'ora';
import { sleep } from './util.js';

export default async function () {
	const spinner = ora(`Connecting to SSH...`).start();
	await sleep(100);
	// await sshconnect();
	const success = spinner.succeed(`Connected!`);
	// await sshinteractive();
	return success;
}
