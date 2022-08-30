import { assert } from '@sindresorhus/is';
import inquirer, { type PromptModule } from 'inquirer';
import { type GenericInputPrompt, type GenericListPrompt } from './types.js';

export const genericGetCommand = async (prompt: GenericInputPrompt) => {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
	const command = (await inquirer.prompt({
		message: prompt.message,
		name: prompt.name,
		type: `input`,
	})) as PromptModule;

	const commandString = command[prompt.name as keyof PromptModule];
	assert.string(commandString);
	const returnCommandString = commandString as string;
	return returnCommandString;
};

export const genericListMenu = async (prompt: GenericListPrompt) => {
	// Accepts a menu name, message, and array of choices.
	// Returns the choice the user made as a number index of the array (1-indexed).
	const menu = (await inquirer.prompt([
		{
			choices: prompt.choices,
			message: prompt.message,
			name: prompt.name,
			type: `list`,
		},
	])) as PromptModule;
	const menuChoice = menu[prompt.name as keyof PromptModule];
	assert.string(menuChoice);
	const menuChoiceString: string = menuChoice as string;
	// Compare 'handled' to the array of strings in mainMenuChoices and return the index of the match (1-indexed).
	const menuChoiceIndex = prompt.choices.indexOf(menuChoiceString) + 1;
	return menuChoiceIndex;
};
