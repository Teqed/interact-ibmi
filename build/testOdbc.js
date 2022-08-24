import { queryOdbc, getvalues, getrows } from './odbc.js';
import { testUser } from './testObjects.js';
import { convertUserInterface } from './util.js';
// testOdbc shows the results of the query to the user, by basic getrows() query.
export const testOdbc = async (command) => {
    try {
        const query = await queryOdbc(command);
        getrows(query);
        return query;
    }
    catch (error) {
        console.log(error);
        const narrowError = error;
        console.log(narrowError.odbcErrors.forEach);
        return error;
    }
};
export const updateOdbc = async () => {
    const query = await queryOdbc('SELECT * FROM TEQ1.TQ002AP');
    const v1 = 'Carol';
    const v2 = query[0][query.columns[1].name];
    const v3 = query[0][query.columns[2].name];
    const update = await queryOdbc(`INSERT INTO TEQ1.TQ002AP VALUES('${v1}', '${v2}', '${v3}')`);
    console.log(update);
};
export const updateOdbc2 = async () => {
    const query = await queryOdbc('SELECT * FROM TEQ1.TQ002AP');
    const v1 = 'Carol';
    const v2 = query[0][query.columns[1].name];
    const v3 = query[0][query.columns[2].name];
    const update = await queryOdbc(`INSERT INTO TEQ1.TQ002AP VALUES('${v1}', '${v2}', '${v3}')`);
    console.log(update);
};
export const findUser = async (user) => {
    const query = await queryOdbc(`SELECT * FROM QSYS2.USER_INFO WHERE AUTHORIZATION_NAME = '${user}'`);
    getvalues(query);
    return query;
};
/* Copies an existing user and creates a new user with the same privileges. */
export const copyUser = async (copyFromUser, newUser, userDescription) => {
    const fromUserRaw = await queryOdbc(`SELECT * FROM QSYS2.USER_INFO WHERE AUTHORIZATION_NAME = '${copyFromUser}'`);
    // ! fromUser will be assigned here.
    const fromUser = testUser;
    const toUser = convertUserInterface(fromUser, newUser, userDescription);
    /* If the result of query is empty, then the user does not exist. */
    if (fromUserRaw.length === 0) {
        console.log(`User ${copyFromUser} does not exist.`);
        return;
    }
    const query2 = await queryOdbc(`SELECT * FROM QSYS2.USER_INFO_BASIC WHERE AUTHORIZATION_NAME = '${newUser}'`);
    /* If the result of query2 is not empty, then the new user already exists. */
    if (query2.length !== 0) {
        console.log(`User ${newUser} already exists.`);
        return;
    }
    /* If their accounting code is NOCOPY, don't copy this user. */
    if (fromUser.ACCOUNTING_CODE === 'NOCOPY') {
        console.log(`User ${copyFromUser} is not copyable.`);
        return;
    }
    /* Check if the library object already exists. */
    const query3 = await queryOdbc(`SELECT * FROM TABLE (QSYS2.OBJECT_STATISTICS('TEQ1', '*LIB')) AS X `);
    /* If the result of query3 is empty, then the library does not exist. */
    if (query3.length === 0) {
        console.log(`Library TEQ1 does not exist.`);
        return;
    }
    /* Assemble the user variables into a string using template literals. */
    let qcmdexc = `CRTUSRPRF \
USRPRF(${toUser.userId}) \
STATUS(*ENABLED) \
PASSWORD(${toUser.userPassword}) \
PWDEXP(*YES) \
USRCLS(${toUser.userClass}) \
INLPGM(${toUser.userInitialProgram}) \
INLMNU(${toUser.userInitialMenu}) \
LMTCPB(${toUser.userLimitCapabilities}) \
TEXT(${toUser.userText}) \
SPCAUT(${toUser.userSpecialAuthority}) \
JOBD(${toUser.userJobDescription}) \
GRPPRF(${toUser.userGroupProfile}) \
GRPAUT(${toUser.userGroupAuthority}) \
ACGCDE(${toUser.userAccountingCode}) \
DLVRY(${toUser.userDelivery}) \
OUTQ(${toUser.userOutqueue}) \
ATNPGM(${toUser.userAttentionProgram}) \
SUPGRPPRF(${toUser.userSupplementalGroups})`;
    console.log(qcmdexc);
    // TODO Send a system command to create user. Monitor for failure.
    const query4 = await queryOdbc(`CALL QSYS2.QCMDEXC('${qcmdexc}')`);
    /* If query4 returns an error executing the sql statement, do something. */
    console.log(query4);
    // sshcmd({
    // cmd: `system -i "CALL PGM(QCMDEXC) PARM(${qcmdexc} 2000)"`,
    // stdin: ``,
    // });
    const query5 = await queryOdbc(`SELECT * FROM QSYS2.USER_INFO_BASIC WHERE AUTHORIZATION_NAME = '${newUser}'`);
    /* If the result of query4 is empty, then the user does not exist. */
    if (query5.length === 0) {
        console.log(`User ${newUser} failed to create.`);
    }
    let userPasswordExpirationInterval;
    let userMaximumAllowedStorage;
    let userCharacterCodeSetId;
    switch (fromUser.PASSWORD_EXPIRATION_INTERVAL) {
        case 0:
            userPasswordExpirationInterval = '*SYSVAL';
            break;
        case -1:
            userPasswordExpirationInterval = '*NOMAX';
            break;
        default:
            userPasswordExpirationInterval = fromUser.PASSWORD_EXPIRATION_INTERVAL;
            break;
    }
    switch (fromUser.MAXIMUM_ALLOWED_STORAGE) {
        // TODO These values need to be confirmed.
        case BigInt(-1):
            userMaximumAllowedStorage = '*NOMAX';
            break;
        default:
            userMaximumAllowedStorage = fromUser.MAXIMUM_ALLOWED_STORAGE;
    }
    switch (fromUser.CHARACTER_CODE_SET_ID) {
        // TODO These values need to be confirmed.
        case '-2':
            userCharacterCodeSetId = '*SYSVAL';
            break;
        default:
            userCharacterCodeSetId = fromUser.CHARACTER_CODE_SET_ID;
    }
    /* Assemble the user variables into a string using template literals. */
    qcmdexc = `CHGUSRPRF \
USRPRF(${newUser}) \
PWDEXP(*YES) \
PWDEXPITV(${userPasswordExpirationInterval}) \
MAXSTG(${userMaximumAllowedStorage}) \
CCSID(${userCharacterCodeSetId})`;
    console.log(qcmdexc);
    // TODO Send a system command to change user. Monitor for failure.
    /* Change object owner to QSECOFR. */
    qcmdexc = `CHGOBJOWN \
OBJ(QSYS/${newUser}) \
OBJTYPE(*USRPRF) \
NEWOWN(QSECOFR)`;
    console.log(qcmdexc);
    /* Check if fromUser exists on any authorization lists, then copy newUser to them. */
    /* This information is on the view AUTHORIZATION_LIST_USER_INFO. */
    const query6 = await queryOdbc(`SELECT * FROM QSYS2.AUTHORIZATION_LIST_USER_INFO WHERE AUTHORIZATION_NAME = '${copyFromUser}'`);
    console.log(query6[0]);
};
