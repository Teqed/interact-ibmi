/* This contains utility functions for the application. */

import chalkAnimation from 'chalk-animation';
import { type QualifiedObject } from './util/types';

// Sleep for X milliseconds, or a default of a half second.
// eslint-disable-next-line func-style
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
	process.stdout.write(`\u001Bc`);
};

// eslint-disable-next-line func-style
export function qualifyObject(LibraryAndObject: QualifiedObject): string {
	// TODO: Test the special object parameters.
	if (
		(LibraryAndObject.object === `*SAME` ||
			LibraryAndObject.object === `*NONE` ||
			LibraryAndObject.object === `*SIGNOFF` ||
			LibraryAndObject.object === `*USRPRF` ||
			LibraryAndObject.object === `*WRKSTN` ||
			LibraryAndObject.object === `*DEV` ||
			LibraryAndObject.object === `*SYSVAL` ||
			LibraryAndObject.object === `*ASSIST` ||
			LibraryAndObject.object === `*HEX` ||
			LibraryAndObject.object === `*LANGIDSHR` ||
			LibraryAndObject.object === `*LANGIDUNQ` ||
			LibraryAndObject.object.startsWith(`*`)) && // Covers any other special objects.
		LibraryAndObject.library === null
	)
		// If any of the special objects are used, return the object as-is.
		return LibraryAndObject.object;
	// If the library is null, but the object is not a special object, set the library to *LIBL.
	// ? I'm not sure if this condition would occur in practice.
	const innerLibrary = LibraryAndObject.library ?? `*LIBL`;
	// return a string in the format 'library/object'.
	return `${innerLibrary}/${LibraryAndObject.object}`;
}

export const welcome = async () => {
	const rainbowTitle = chalkAnimation.rainbow(`Hello universe! \n`);
	await sleep();
	rainbowTitle.stop();
	return 0;
};

export const returnZero = async () => {
	return 0;
};

/* eslint-disable unicorn/no-null */
export const stringToBoolean = (string: string) => {
	switch (string.toLowerCase().trim()) {
		case `true`:
		case `yes`:
		case `y`:
		case `1`:
			return true;
		case `false`:
		case `no`:
		case `n`:
		case `0`:
		case null:
		case undefined:
			return false;
		default:
			return Boolean(string);
	}
};
/* eslint-enable unicorn/no-null */
