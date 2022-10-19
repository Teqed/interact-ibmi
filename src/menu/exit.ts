import ora from 'ora';

// eslint-disable-next-line import/no-mutable-exports
export let exitMenuMain = false;

export default async function () {
	const spinner = ora(`Exiting...`).start();
	exitMenuMain = true;
	/* Throw an error to exit the program */
	spinner.succeed(`Exited cleanly.`);
	return new Error(`Exited cleanly.`);
}

// TODO - https://github.com/jtlapp/node-cleanup