#!/usr/bin/env ts-node
/* This contains utility functions for the application. */
// Sleep for X milliseconds, or a default of a half second.
export const sleep = (milliseconds = 500) => {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
export const handeError = (error) => {
    console.log(error);
    process.exit(1);
};
export const clearScreen = () => {
    process.stdout.write("\u001Bc");
};
// An function expression looks like this:
export const functionExpression = (() => {
    console.log("Hello World!");
})();
