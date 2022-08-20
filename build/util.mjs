#!/usr/bin/env ts-node
/* This contains utility functions for the application. */
// Sleep for X milliseconds, or a default of a half second.
export async function sleep(milliseconds = 500) {
    return new Promise((resolve) => 
    // eslint-disable-next-line no-promise-executor-return
    setTimeout(resolve, milliseconds));
}
export const handleError = (error) => {
    console.log(error);
    process.exit(1);
};
export const clearScreen = () => {
    process.stdout.write('\u001Bc');
};
