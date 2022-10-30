import chalk from 'chalk';
import { genericGetCommand, genericPressEnterPrompt } from '../../../generic/generic.js';
import pickUser from '../pick-user.js';
import copyUser from './copyuser-util.js';

export default async function () {
	console.log(
		chalk.bgBlue(
			`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Copy User\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`,
		),
	);
	const fromUser: string = await pickUser();
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
