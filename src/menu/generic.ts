import chalk from 'chalk';
import input from '@inquirer/input';
import rawlist from '@inquirer/rawlist';
import select from '@inquirer/select';
import { type GenericInputPrompt, type GenericListPrompt } from '../util/types.js';

// The genericGetCommand function is used to get a command from the user.
// It can be used to run queries or system commands, or to get input from the user.
// The function takes a prompt object as an argument, which asks the user for input.
// It might say something like "Please enter a command:".
export const genericGetCommand = async (prompt: GenericInputPrompt) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const command: string = await input(
		{ default: prompt.default, message: prompt.message },
		{ clearPromptOnDone: prompt.clearPromptOnDone ?? true },
	);

	return command;
};

export const genericListMenu = async (prompt: GenericListPrompt) => {
	console.clear();
	// genericListMenu is used to display a list of options to the user.
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	const menu: string = (await rawlist(
		{
			// Add a choice for every option in the array prompt.choices.
			choices: prompt.choices.map(choice => {
				return {
					name: choice,
					value: choice,
				};
			}),
			message: prompt.message,
		},
		{ clearPromptOnDone: prompt.clearPromptOnDone ?? true },
	)) as string;
	return menu;
};

export const genericSelectMenu = async (prompt: GenericListPrompt) => {
	console.clear();
	// genericSelectMenu is used to display a list of options to the user.
	// It takes a prompt object as an argument, which contains the menu name,
	// the list of options and a message.
	// The message might say something like "Please select an option:".
	// The menu name might be colored with chalk.
	// Accepts a menu name, message, and array of choices.
	// Returns the choice the user made as a number index of the array (1-indexed).
	// 1-index is used to match the keybindings of inquirer on the command line.
	// The user can press 1 to select the first option, 2 for the second, etc.
	const menu = await select(
		{
			// Add a choice for every option in the array prompt.choices.
			choices: prompt.choices.map(choice => {
				return {
					name: choice,
					value: choice,
				};
			}),
			message: prompt.message,
		},
		{ clearPromptOnDone: prompt.clearPromptOnDone ?? true },
	);
	return menu;
};

export const generatedListMenu = async (prompt: GenericListPrompt) => {
	console.clear();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	const menu: string = (await rawlist(
		{
			choices: prompt.choices.map(choice => {
				return {
					name: choice,
					value: choice,
				};
			}),
			message: prompt.message,
		},
		{ clearPromptOnDone: prompt.clearPromptOnDone ?? true },
	)) as string;
	return menu;
};

export const generatedSelectMenu = async (prompt: GenericListPrompt) => {
	console.clear();
	const menu = await select(
		{
			choices: prompt.choices.map(choice => {
				return {
					name: choice,
					value: choice,
				};
			}),
			message: prompt.message,
		},
		{ clearPromptOnDone: prompt.clearPromptOnDone ?? true },
	);
	return menu;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const genericPasswordMenu = async (config: any, clearPromptOnDone?: boolean) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
	return input(
		{
			...config,
			default: undefined,
			// eslint-disable-next-line @typescript-eslint/no-shadow
			transformer(input, { isFinal }) {
				if (config.mask) {
					return String(config.mask).repeat(input.length);
				}

				if (!isFinal) {
					return chalk.dim(`[input is masked]`);
				}

				return ``;
			},
		},
		{ clearPromptOnDone: clearPromptOnDone ?? true },
	);
};
