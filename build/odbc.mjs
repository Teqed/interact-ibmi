#!/usr/bin/env ts-node
/* This is the module for making ODBC database connections to the IBMi AS400.
It has prepared statements as well as allowing custom statements from user input. */
import odbc from 'odbc';
import { connection } from './index.mjs';
import loginUser from './loginUser.mjs';
const getrows = (query) => {
    // Get the number of rows in the result set.
    const numberRows = query.length;
    // Iterate over the result set.
    for (let index = 0; index < numberRows; index++) {
        // Get the current row.
        const row = query[index];
        // Print the row.
        console.log(row);
    }
};
const getvalues = (query) => {
    // Get the the name and value of each row and column.
    const numberRows = query.length;
    // Iterate over the result set.
    for (let index = 0; index < numberRows; index++) {
        // Get the current row.
        const row = query[index];
        // Iterate over the columns in the row.
        // ? This for..loop may need to be replaced with an array iteration.
        // eslint-disable-next-line no-restricted-syntax
        for (const element of query.columns) {
            // Get the current column.
            const column = element;
            // Print the column name and value.
            console.log(`${column.name}: ${row[column.name]}`);
        }
    }
};
export const queryOdbc = async (statement) => connection.query(statement);
export const testOdbc = async (command) => {
    const query = await queryOdbc(command);
    getrows(query);
};
export const updateOdbc = async () => {
    const query = await queryOdbc('SELECT * FROM TEQ1.TQ002AP');
    const v1 = 'Carol';
    const v2 = query[0][query.columns[1].name];
    const v3 = query[0][query.columns[2].name];
    const update = await queryOdbc(`INSERT INTO TEQ1.TQ002AP VALUES('${v1}', '${v2}', '${v3}')`);
    console.log(update);
};
export const connectOdbc = async () => {
    const connectionString = `DRIVER=IBM i Access ODBC Driver;SYSTEM='PUB400.COM';UID=${loginUser.loginId};PWD=${loginUser.loginPw};`;
    return odbc.connect(connectionString);
};
export const findUser = async (user) => {
    const query = await connection.query(`SELECT * FROM QSYS2.USER_INFO WHERE AUTHORIZATION_NAME = '${user}'`);
    getvalues(query);
    return query;
};
