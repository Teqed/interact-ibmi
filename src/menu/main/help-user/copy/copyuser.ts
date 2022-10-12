import chalk from 'chalk';
import { genericGetCommand, genericPressEnterPrompt } from '../../../generic.js';
import copyUser from './copyuser-util.js';

export default async function () {
	const fromUser: string = await genericGetCommand({
		clearPromptOnDone: false,
		message: `Enter user ID to copy from:`,
	});
	const toUser: string = await genericGetCommand({
		clearPromptOnDone: false,
		message: `Enter user ID to copy to:`,
	});
	const toUserText: string = await genericGetCommand({
		clearPromptOnDone: false,
		message: `Enter user description:`,
	});
	console.log(
		await copyUser(fromUser, toUser, toUserText).catch(async (error: Error) => {
			const errorString = error.message;
			console.error(chalk.red.bgBlack(`${errorString}`));
			return `Failure to create user.`;
		}),
	);
	return genericPressEnterPrompt();
}
