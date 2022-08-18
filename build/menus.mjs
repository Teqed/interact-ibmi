#!/usr/bin/env ts-node
import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import { createSpinner } from 'nanospinner';
//import { sshcmd, sshconnect, sshinteractive } from './ssh.mjs';
import { sshconnect } from './ssh.mjs';
import { User } from './login.mjs';
import { sqlcmd } from './sql.mjs';
import odbc from 'odbc';
//const odbcconf: { host: string; username: string; password: string; };
//const conf = new odbcconf();
class OdbcConf {
    host;
    username;
    password;
    constructor(host, username, password) {
        this.host = host;
        this.username = username;
        this.password = password;
    }
}
async function testODBC() {
    const myConf = new OdbcConf('PUB400.COM', User.loginID, User.loginPW);
    const connectionString = `DRIVER=IBM i Access ODBC Driver;SYSTEM=${myConf.host};UID=${myConf.username};PWD=${myConf.password};`;
    const connection = await odbc.connect(connectionString);
    const query = await connection.query('SELECT * FROM TEQ1.TQ002AP');
    console.log(query);
    let v1 = 'Carol';
    let v2 = query[0][query.columns[1].name];
    let v3 = query[0][query.columns[2].name];
    const update = await connection.query(`INSERT INTO TEQ1.TQ002AP VALUES('${v1}', '${v2}', '${v3}')`);
    console.log(update);
}
const sleep = (ms = 500) => new Promise((r) => setTimeout(r, ms));
export async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('Hello universe! \n');
    await sleep();
    rainbowTitle.stop();
}
export async function mainmenu() {
    const menu = await inquirer.prompt({
        name: 'main',
        type: 'list',
        message: `
    ${chalk.bgBlue('MAIN MENU')}
    Select options below.
    `,
        choices: [
            '1. Call DB2',
            '2. ODBC',
            '3. Exit',
            '4. SSH',
        ],
    });
    return handleAnswer(menu.main);
}
async function handleAnswer(answer) {
    if (answer == '1. Call DB2') {
        const spinner = createSpinner('Checking...').start();
        await sleep();
        spinner.stop();
        await sshconnect();
        await sqlcmd();
    }
    else if (answer == '2. ODBC') {
        await testODBC();
    }
    else if (answer == '4. SSH') {
        const spinner = createSpinner('Connecting to SSH...').start();
        await sleep();
        spinner.stop();
        //        return sshinteractive();
    }
    else {
        const spinner = createSpinner('Exiting...').start();
        await sleep();
        spinner.error({ text: `Exited cleanly. Goodbye, ${User.loginID}!` });
        process.exit(1);
    }
}
