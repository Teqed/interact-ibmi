/* eslint-disable unicorn/no-useless-undefined */
import {
	type AsyncPromptConfig,
	createPrompt,
	useState,
	useKeypress,
	// usePrefix,
	isEnterKey,
	isBackspaceKey,
} from '@inquirer/core';
import chalk from 'chalk';

type InputConfig = AsyncPromptConfig & {
	default?: string;
	transformer?: (value: string, { isFinal }: { isFinal: boolean }) => string;
};

export default createPrompt<string, InputConfig>((config, done) => {
	const [status, setStatus] = useState<string>(`pending`);
	const [defaultValue, setDefaultValue] = useState<string | undefined>(config.default);
	const [errorMessage, setError] = useState<string | undefined>(undefined);
	const [value, setValue] = useState<string>(``);

	// const isLoading = status === `loading`;
	// const prefix = usePrefix(isLoading);

	useKeypress(async (key, rl) => {
		// Ignore keypress while our prompt is doing other processing.
		if (status !== `pending`) {
			return;
		}

		if (isEnterKey(key)) {
			const answer = (value || defaultValue) ?? ``;
			setStatus(`loading`);
			const isValid = await config.validate(answer);
			if (isValid === true) {
				setValue(answer);
				setStatus(`done`);
				done(answer);
			} else {
				setValue(``);
				setError(isValid || `You must provide a valid value`);
				setStatus(`pending`);
			}
		} else if (isBackspaceKey(key) && !value) {
			setDefaultValue(undefined);
		} else {
			setValue(rl.line);
			setError(undefined);
		}
	});

	const message = chalk.bold(config.message);
	let formattedValue = value;
	if (typeof config.transformer === `function`) {
		formattedValue = config.transformer(value, { isFinal: status === `done` });
	}

	if (status === `done`) {
		formattedValue = chalk.cyan(formattedValue);
	}

	let defaultString = ``;
	if (defaultValue && status !== `done` && !value) {
		defaultString = chalk.dim(` (${defaultValue})`);
	}

	let error = ``;
	if (errorMessage) {
		error = chalk.red(`> ${errorMessage}`);
	}

	// return [`${prefix} ${message}${defaultString} ${formattedValue}`, error];
	return [`${message}${defaultString} ${formattedValue}`, error];
});
