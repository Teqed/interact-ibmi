/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable canonical/sort-keys */
import fuzzy from 'fuzzy';
import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import { type GenericListPrompt } from '../../util/types.js';

export default async function (prompt: GenericListPrompt) {
	console.clear();

	inquirer.registerPrompt(`autocomplete`, inquirerPrompt);

	// eslint-disable-next-line func-style
	async function searchChoices(answers: any, input = ``) {
		return new Promise(resolve => {
			setTimeout(() => {
				// eslint-disable-next-line unicorn/no-array-method-this-argument
				resolve(fuzzy.filter(input, prompt.choices).map(element => element.original));
				// prompt.choices
			}, 10);
		});
	}

	const menu = await inquirer
		.prompt([
			{
				type: `autocomplete`,
				name: `autocomplete_prompt`,
				message: prompt.message,
				// searchText: `We are searching the internet for you!`,
				// emptyText: `Nothing found!`,
				source: searchChoices,
				pageSize: 10,
				// validate(value) {
				// 	return value ? true : `Type something!`;
				// },
			},
		])
		.then(answers => {
			return answers.autocomplete_prompt;
		});

	const menuString = menu as unknown as string;

	return menuString;
}
