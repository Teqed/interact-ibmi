import {
	createPrompt,
	useState,
	useKeypress,
	isEnterKey,
	usePrefix,
	isSpaceKey,
} from '@inquirer/core';
import input from '@inquirer/input';
import rawlist from '@inquirer/rawlist';
import select from '@inquirer/select';
import chalk from 'chalk';
import { type GenericInputPrompt, type GenericListPrompt } from '../util/types.js';

// The genericGetCommand function is used to get a command from the user.
// It can be used to run queries or system commands, or to get input from the user.
// The function takes a prompt object as an argument, which asks the user for input.
// It might say something like "Please enter a command:".
export const genericGetCommand = async (prompt: GenericInputPrompt) => {
	const command: string = await input(
		{ default: prompt.default, message: prompt.message },
		{ clearPromptOnDone: prompt.clearPromptOnDone ?? true },
	);

	return command;
};

export const genericListMenu = async (prompt: GenericListPrompt) => {
	console.clear();
	// genericListMenu is used to display a list of options to the user.

	const menu: string = await rawlist(
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

	const menu: string = await rawlist(
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

export const genericPasswordMenu = async (config: {
	clearPromptOnDone?: boolean;
	mask?: string;
	message: string;
}) => {
	return input(
		{
			default: undefined,
			message: config.message,
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
		{ clearPromptOnDone: config.clearPromptOnDone ?? true },
	);
};

const customConfirm = createPrompt<
	boolean,
	{ continueKey?: `enter` | `space`; default?: boolean; message: string }
>((config, done) => {
	const [status, setStatus] = useState(`pending`);
	const [value, setValue] = useState(``);
	const prefix = usePrefix();

	switch (config.continueKey) {
		case `enter`: {
			useKeypress((key, rl) => {
				if (isEnterKey(key)) {
					const answer = value ? /^y(es)?/iu.test(value) : config.default !== false;
					setValue(answer ? `yes` : `no`);
					setStatus(`done`);
					rl.close();
					done(answer);
				} else {
					// Ignore other keys.
				}
			});
			break;
		}

		case `space`: {
			useKeypress((key, rl) => {
				if (isSpaceKey(key)) {
					const answer = value ? /^y(es)?/iu.test(value) : config.default !== false;
					setValue(answer ? `yes` : `no`);
					setStatus(`done`);
					rl.close();
					done(answer);
				} else {
					// Ignore other keys.
				}
			});
			break;
		}

		default: {
			useKeypress((key, rl) => {
				rl.close();
				setValue(key.name);
				setStatus(`done`);
				done(true);
			});
			break;
		}
	}

	let formattedValue = value;
	let defaultValue = ``;
	if (status === `done`) {
		formattedValue = chalk.cyan(value);
	} else {
		defaultValue = chalk.dim(``);
	}

	const message = chalk.bold(config.message);
	return `${prefix} ${message}${defaultValue} ${formattedValue}`;
});

export const genericPressKeyPrompt = async () => {
	return await customConfirm(
		{
			message: `Press any key to continue...`,
		},
		{ clearPromptOnDone: true },
	);
};

export const genericPressEnterPrompt = async () => {
	return await customConfirm(
		{
			continueKey: `enter`,
			message: `Press the Enter key to continue...`,
		},
		{ clearPromptOnDone: true },
	);
};

export const genericPressSpacePrompt = async () => {
	return await customConfirm(
		{
			continueKey: `space`,
			message: `Press the Space key to continue...`,
		},
		{ clearPromptOnDone: true },
	);
};
