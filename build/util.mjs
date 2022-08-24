/* This contains utility functions for the application. */
// Sleep for X milliseconds, or a default of a half second.
export async function sleep(milliseconds = 500) {
    return new Promise(resolve => 
    // eslint-disable-next-line no-promise-executor-return
    setTimeout(resolve, milliseconds));
}
export const handleError = (error) => {
    console.log(error);
    /* Throw an error. */
    throw error;
};
export const clearScreen = () => {
    process.stdout.write('\u001Bc');
};
/* If qualifierLibrary is null, return qualifierObject.
If qualifierLibrary is not null, return qualifierLibrary/qualifierObject. */
export function qualifier(qualifierLibrary, qualifierObject) {
    if (qualifierLibrary === null) {
        return qualifierObject;
    }
    return `${qualifierLibrary}/${qualifierObject}`;
}
/* If possiblyNullValue is null or undefined, return an empty string.
Otherwise, return possiblyNullValue. */
export function notNull(possiblyNullValue) {
    if (possiblyNullValue === null) {
        return '';
    }
    if (possiblyNullValue === undefined) {
        return '';
    }
    return possiblyNullValue; // Now definitely not null.
}
export function convertUserInterface(inputObject) {
    /* Setup user values for CRTUSRPRF. */
    const userPassword = '*NONE';
    const userClass = inputObject.USER_CLASS_NAME;
    // const userInitialProgram = `${fromUser.INITIAL_PROGRAM_LIBRARY_NAME}/${fromUser.INITIAL_PROGRAM_NAME}`;
    const userInitialProgram = qualifier(inputObject.INITIAL_PROGRAM_LIBRARY_NAME, inputObject.INITIAL_PROGRAM_NAME);
    const userInitialMenu = qualifier(inputObject.INITIAL_MENU_LIBRARY_NAME, inputObject.INITIAL_MENU_NAME);
    const userLimitCapabilities = inputObject.LIMIT_CAPABILITIES;
    const userSpecialAuthority = notNull(inputObject.SPECIAL_AUTHORITIES);
    const userJobDescription = qualifier(inputObject.JOB_DESCRIPTION_LIBRARY_NAME, inputObject.JOB_DESCRIPTION_NAME);
    const userGroupProfile = inputObject.GROUP_PROFILE_NAME;
    const userGroupAuthority = inputObject.GROUP_AUTHORITY;
    const userAccountingCode = notNull(inputObject.ACCOUNTING_CODE);
    const userDelivery = inputObject.MESSAGE_QUEUE_DELIVERY_METHOD;
    const userOutqueue = qualifier(inputObject.OUTPUT_QUEUE_LIBRARY_NAME, inputObject.OUTPUT_QUEUE_NAME);
    const userAttentionProgram = qualifier(inputObject.ATTENTION_KEY_HANDLING_PROGRAM_LIBRARY_NAME, inputObject.ATTENTION_KEY_HANDLING_PROGRAM_NAME);
    const userSupplementalGroups = notNull(inputObject.SUPPLEMENTAL_GROUP_LIST);
    return {
        userAccountingCode,
        userAttentionProgram,
        userClass,
        userDelivery,
        userGroupAuthority,
        userGroupProfile,
        userInitialMenu,
        userInitialProgram,
        userJobDescription,
        userLimitCapabilities,
        userOutqueue,
        userPassword,
        userSpecialAuthority,
        userSupplementalGroups,
    };
}
