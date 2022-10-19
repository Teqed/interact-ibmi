import ora from 'ora';
import { sleep } from '../../../util.js';
import findUsers, { foundUsers } from '../../../util/find-users.js';
import autocompletePrompt from '../../autocomplete-prompt.js';
import { genericPressEnterPrompt } from '../../generic.js';

export default async function () {
	// Create an array of strings containing menu choices made of the query results.
	// Make sure that foundUsers is not undefined. If it is, sleep for 100 ms and try again.
	const spinner = ora(`Finding users...`).start();
	// eslint-disable-next-line no-unmodified-loop-condition
	while (foundUsers === undefined) {
		// eslint-disable-next-line no-await-in-loop
		await sleep(100);
	}

	spinner.succeed(`Users found!`);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const choices = foundUsers.map((row: any) => {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		return `${row.AUTHORIZATION_NAME}`;
	});

	const pickUserMenuChoice = await autocompletePrompt({
		choices,
		message: `
		Select a user below.
		`,
	});
	void findUsers();
	return pickUserMenuChoice;
}
