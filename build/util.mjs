#!/usr/bin/env ts-node
/* This contains utility functions for the application. */
// Sleep for X milliseconds, or a default of a half second.
export async function sleep(milliseconds = 500) {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
