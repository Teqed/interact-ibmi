import { assert } from '@sindresorhus/is';
import inquirer, { type PromptModule } from 'inquirer';
// @ts-expect-error InterruptedPrompt has no declaration file, might write one later.
import InterruptedPrompt from 'inquirer-interrupted-prompt';
import { type GenericInputPrompt, type GenericListPrompt } from '../types.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
// InterruptedPrompt.fromAll(inquirer);

// The genericGetCommand function is used to get a command from the user.
// It can be used to run queries or system commands, or to get input from the user.
// The function takes a prompt object as an argument, which asks the user for input.
// It might say something like "Please enter a command:".
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
	// genericListMenu is used to display a list of options to the user.
	// It takes a prompt object as an argument, which contains the menu name,
	// the list of options and a message.
	// The message might say something like "Please select an option:".
	// The menu name might be colored with chalk.
	// Accepts a menu name, message, and array of choices.
	// Returns the choice the user made as a number index of the array (1-indexed).
	// 1-index is used to match the keybindings of inquirer on the command line.
	// The user can press 1 to select the first option, 2 for the second, etc.
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

export const generatedListMenu = async (prompt: GenericListPrompt) => {
	// genericListMenu is used to display a list of options to the user.
	// It takes a prompt object as an argument, which contains the menu name,
	// the list of options and a message.
	// The message might say something like "Please select an option:".
	// The menu name might be colored with chalk.
	// Accepts a menu name, message, and array of choices.
	// Returns the choice the user made as a string.
	// 1-index is used to match the keybindings of inquirer on the command line.
	// The user can press 1 to select the first option, 2 for the second, etc.
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
	return menuChoiceString;
};
