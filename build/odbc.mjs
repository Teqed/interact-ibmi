import { loginUser } from './login.mjs';
import odbc from 'odbc';
export async function testOdbc() {
    const connectionString = `DRIVER=IBM i Access ODBC Driver;SYSTEM='PUB400.COM';UID=${loginUser.loginId};PWD=${loginUser.loginPw};`;
    const connection = await odbc.connect(connectionString);
    const query = await connection.query('SELECT * FROM TEQ1.TQ002AP');
    console.log(query);
    const v1 = 'Carol';
    const v2 = query[0][query.columns[1].name];
    const v3 = query[0][query.columns[2].name];
    const update = await connection.query(`INSERT INTO TEQ1.TQ002AP VALUES('${v1}', '${v2}', '${v3}')`);
    console.log(update);
}
export async function freeOdbc(statement) {
    const connectionString = `DRIVER=IBM i Access ODBC Driver;SYSTEM='PUB400.COM';UID=${loginUser.loginId};PWD=${loginUser.loginPw};`;
    const connection = await odbc.connect(connectionString);
    const query = await connection.query(statement);
    return query;
}
