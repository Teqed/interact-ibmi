#!/usr/bin/env ts-node
/* This contains utility functions for the application. */
// Sleep for X milliseconds, or a default of a half second.
export const sleep = async (milliseconds = 500) => {
	return new Promise(resolve => {
		// eslint-disable-next-line no-promise-executor-return
		return setTimeout(resolve, milliseconds);
	});
};

export const handleError = (error: Error) => {
	console.log(error);
	process.exit(1);
};

export const clearScreen = () => {
	process.stdout.write('\u001Bc');
};
