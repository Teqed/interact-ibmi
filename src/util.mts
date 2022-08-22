/* This contains utility functions for the application. */
// Sleep for X milliseconds, or a default of a half second.
export async function sleep(milliseconds = 500) {
	return new Promise(resolve =>
		// eslint-disable-next-line no-promise-executor-return
		setTimeout(resolve, milliseconds),
	);
}

export const handleError = (error: Error) => {
	console.log(error);
	/* Throw an error. */
	throw error;
};

export const clearScreen = () => {
	process.stdout.write('\u001Bc');
};
