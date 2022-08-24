import { connection } from './login.js';
export const getrows = (query) => {
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
export const getvalues = (query) => {
    // Iterate over the results.
    query.forEach(row => {
        // Iterate over the columns in the row.
        query.columns.forEach(column => {
            // Print the column name and value.
            console.log(`${column.name}: ${row[column.name]}`);
        });
    });
};
// queryOdbc is a function that takes a query and returns a promise that resolves to the result of the query.
// It does not show the result of the query to the user.
export const queryOdbc = async (statement) => connection.query(statement);
