import chalk from 'chalk';
import copyUser from './copyuser-util.js';
import { genericGetCommand } from '../../generic.js';

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
			const errorString = error.message;
			console.error(chalk.red.bgBlack(`${errorString}`));
			return `Failure to create user.`;
		}),
	);
	return 0;
}
