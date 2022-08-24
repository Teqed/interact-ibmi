/* This contains utility functions for the application. */

import { createUserInterface, ibmiUserInterface } from './types.mjs';

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

/* If qualifierLibrary is null, return qualifierObject. 
If qualifierLibrary is not null, return qualifierLibrary/qualifierObject. */
export function qualifier(qualifierLibrary: string | null, qualifierObject: string): string {
	if (qualifierLibrary === null) {
		return qualifierObject;
	}
	return `${qualifierLibrary}/${qualifierObject}`;
}

/* If possiblyNullValue is null or undefined, return an empty string.
Otherwise, return possiblyNullValue. */
export function notNull(possiblyNullValue: string | null | undefined): string {
	if (possiblyNullValue === null) {
		return '';
	}
	if (typeof possiblyNullValue === 'undefined') {
		return '';
	}
	if (typeof possiblyNullValue === 'string') {
		return possiblyNullValue; // Now definitely not null.
	}
	throw new Error(`Type unexpected`);
}

export function convertUserInterface(
	copyUser: ibmiUserInterface,
	newUser: string,
	newDescription: string,
): createUserInterface {
	/* Setup user values for CRTUSRPRF. */
	const userId = newUser;
	const userText = newDescription;
	const userPassword = '*NONE';
	const userClass = copyUser.USER_CLASS_NAME;
	const userInitialProgram = qualifier(
		copyUser.INITIAL_PROGRAM_LIBRARY_NAME,
		copyUser.INITIAL_PROGRAM_NAME,
	);
	const userInitialMenu = qualifier(
		copyUser.INITIAL_MENU_LIBRARY_NAME,
		copyUser.INITIAL_MENU_NAME,
	);
	const userLimitCapabilities = copyUser.LIMIT_CAPABILITIES;
	const userSpecialAuthority = notNull(copyUser.SPECIAL_AUTHORITIES);
	const userJobDescription = qualifier(
		copyUser.JOB_DESCRIPTION_LIBRARY_NAME,
		copyUser.JOB_DESCRIPTION_NAME,
	);
	const userGroupProfile = copyUser.GROUP_PROFILE_NAME;
	const userGroupAuthority = copyUser.GROUP_AUTHORITY;
	const userAccountingCode = notNull(copyUser.ACCOUNTING_CODE);
	const userDelivery = copyUser.MESSAGE_QUEUE_DELIVERY_METHOD;
	const userOutqueue = qualifier(copyUser.OUTPUT_QUEUE_LIBRARY_NAME, copyUser.OUTPUT_QUEUE_NAME);
	const userAttentionProgram = qualifier(
		copyUser.ATTENTION_KEY_HANDLING_PROGRAM_LIBRARY_NAME,
		copyUser.ATTENTION_KEY_HANDLING_PROGRAM_NAME,
	);
	const userSupplementalGroups = notNull(copyUser.SUPPLEMENTAL_GROUP_LIST);
	return {
		userAccountingCode,
		userAttentionProgram,
		userClass,
		userDelivery,
		userGroupAuthority,
		userGroupProfile,
		userId,
		userInitialMenu,
		userInitialProgram,
		userJobDescription,
		userLimitCapabilities,
		userOutqueue,
		userPassword,
		userSpecialAuthority,
		userSupplementalGroups,
		userText,
	};
}
