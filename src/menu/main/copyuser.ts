import chalk from 'chalk';
import copyUser from './copyuser-util.js';
import { genericGetCommand } from '../util.js';

export default async function () {
	const fromUser: string = await genericGetCommand({
		message: `Enter user ID to copy from:`,
		name: `From User`,
	});
	const toUser: string = await genericGetCommand({
		message: `Enter user ID to copy to:`,
		name: `To User`,
	});
	const toUserText: string = await genericGetCommand({
		message: `Enter user description:`,
		name: `Description`,
	});
	console.log(
		await copyUser(fromUser, toUser, toUserText).catch(async (error: Error) => {
			// eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
			console.error(chalk.red.bgBlack(`${error}`));
			return `Failure`;
		}),
	);
	return 0;
}
