/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable unicorn/no-useless-undefined */
import {
	type AsyncPromptConfig,
	createPrompt,
	useState,
	useKeypress,
	// usePrefix,
	isEnterKey,
} from '@inquirer/core';
import chalk from 'chalk';

const numberRegex = /\d+/u;

type RawlistConfig = AsyncPromptConfig & {
	choices: Array<{ key?: string; name?: string; value: string }>;
};

export default createPrompt<string, RawlistConfig>((config, done) => {
	const { choices } = config;
	const [status, setStatus] = useState<string>(`pending`);
	const [value, setValue] = useState<string>(``);
	const [errorMessage, setError] = useState<string | undefined>(undefined);
	// const prefix = usePrefix();

	useKeypress((key, rl) => {
		if (isEnterKey(key)) {
			let selectedChoice;
			if (numberRegex.test(value)) {
				const answer = Number.parseInt(value, 10) - 1;
				selectedChoice = choices[answer];
			} else {
				const answer = value.toLowerCase();
				// eslint-disable-next-line @typescript-eslint/no-shadow
				selectedChoice = choices.find(({ key }) => key === answer);
			}

			if (selectedChoice) {
				const finalValue = selectedChoice.value || selectedChoice.name;
				setValue(finalValue!);
				setStatus(`done`);
				done(finalValue!);
			} else if (value === ``) {
				setError(`Please input a value`);
			} else {
				setError(`"${chalk.red(value)}" isn't an available option`);
			}
		} else {
			setValue(rl.line);
			setError(undefined);
		}
	});

	const message = chalk.bold(config.message);

	if (status === `done`) {
		// return `${prefix} ${message} ${chalk.cyan(value)}`;
		return `${message} ${chalk.cyan(value)}`;
	}

	const choicesString = choices
		.map((choice, index) => {
			const humanIndex = index + 1;
			const line = `  ${choice.key ?? humanIndex}) ${choice.name ?? choice.value}`;

			if (choice.key === value.toLowerCase() || String(humanIndex) === value) {
				return chalk.cyan(line);
			}

			return line;
		})
		.join(`\n`);

	let error = ``;
	if (errorMessage) {
		error = chalk.red(`> ${errorMessage}`);
	}

	// return [`${prefix} ${message} ${value}`, [choicesString, error].filter(Boolean).join(`\n`)];
	return [`${message} ${value}`, [choicesString, error].filter(Boolean).join(`\n`)];
});
