/* eslint-disable @typescript-eslint/ban-types */
/* This contains utility functions for the application. */

import chalkAnimation from 'chalk-animation';
import { type QualifiedObject } from './util/types';

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
	process.stdout.write(`\u001Bc`);
};

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
