#!/usr/bin/env ts-node
/* This is the module for making ODBC database connections to the IBMi AS400.
It has prepared statements as well as allowing custom statements from user input. */
import { loginUser } from "./login.mjs";
import { connection } from "./index.mjs";
import odbc from "odbc";
export async function testOdbc(command) {
    const query = await queryOdbc(command);
    getrows(query);
}
export async function updateOdbc() {
    const query = await queryOdbc("SELECT * FROM TEQ1.TQ002AP");
    getvalues(query);
    const v1 = "Carol";
    const v2 = query[0][query.columns[1].name];
    const v3 = query[0][query.columns[2].name];
    const update = await queryOdbc(`INSERT INTO TEQ1.TQ002AP VALUES('${v1}', '${v2}', '${v3}')`);
    console.log(update);
}
export async function queryOdbc(statement) {
    // Execute the prepared statement.
    return connection.query(statement);
}
export async function connectOdbc() {
    const connectionString = `DRIVER=IBM i Access ODBC Driver;SYSTEM='PUB400.COM';UID=${loginUser.loginId};PWD=${loginUser.loginPw};`;
    return odbc.connect(connectionString);
}
export async function findUser(user) {
    const query = await connection.query(`SELECT * FROM QSYS2.USER_INFO WHERE AUTHORIZATION_NAME = '${user}'`);
    getvalues(query);
    return query;
}
function getrows(query) {
    // Get the number of rows in the result set.
    const numRows = query.length;
    // Iterate over the result set.
    for (let i = 0; i < numRows; i++) {
        // Get the current row.
        const row = query[i];
        // Print the row.
        console.log(row);
    }
}
function getvalues(query) {
    // Get the the name and value of each row and column.
    const numRows = query.length;
    // Iterate over the result set.
    for (let i = 0; i < numRows; i++) {
        // Get the current row.
        const row = query[i];
        // Iterate over the columns in the row.
        for (const element of query.columns) {
            // Get the current column.
            const column = element;
            // Print the column name and value.
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            console.log(`${column.name}: ${row[column.name]}`);
        }
    }
}
