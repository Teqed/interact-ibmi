import copyUser from './menu-main-copyuser-util.js';
import { genericGetCommand } from './menu-util.js';

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
	await copyUser(fromUser, toUser, toUserText);
	return 0;
}
