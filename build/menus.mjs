#!/usr/bin/env ts-node
import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import { createSpinner } from 'nanospinner';
// Remove: import { sshcmd, sshconnect, sshinteractive } from './ssh.mjs';
import { sshcmd, sshconnect } from './ssh.mjs';
import { loginUser } from './login.mjs';
import odbc from 'odbc';
// eslint-disable-next-line no-promise-executor-return
const sleep = async (ms = 500) => new Promise(r => setTimeout(r, ms));
async function testOdbc() {
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
async function freeOdbc(statement) {
    const connectionString = `DRIVER=IBM i Access ODBC Driver;SYSTEM='PUB400.COM';UID=${loginUser.loginId};PWD=${loginUser.loginPw};`;
    const connection = await odbc.connect(connectionString);
    const query = await connection.query(statement);
    return query;
}
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
            '1. Send System Command',
            '2. ODBC',
            '3. FreeODBC',
            '4. SSH',
        ],
    });
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    return handleAnswer(menu['main'].toString());
}
async function handleAnswer(answer) {
    if (answer === '1. Send System Command') {
        const spinner = createSpinner('Checking...').start();
        await sleep();
        spinner.stop();
        await sshconnect();
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const command = await inquirer.prompt({
            name: 'cmdinput',
            type: 'input',
            message: 'Enter command to send:',
        });
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        const commandStr = command['cmdinput'].toString();
        const rtnCommand = await sshcmd({
            cmd: commandStr,
            stdin: '',
        });
        /* Find the output from rtnCommand */
        console.log(rtnCommand.stdout);
    }
    else if (answer === '2. ODBC') {
        await testOdbc();
    }
    else if (answer === '3. FreeODBC') {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const command = await inquirer.prompt({
            name: 'cmdinput',
            type: 'input',
            message: 'Enter statement to send:',
        });
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        const statement = command['cmdinput'].toString();
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        const rtnStatement = await freeOdbc(statement);
        console.log(rtnStatement);
    }
    else if (answer === '4. SSH') {
        const spinner = createSpinner('Connecting to SSH...').start();
        await sleep();
        spinner.stop();
        // Remove        return sshinteractive();
    }
    else {
        const spinner = createSpinner('Exiting...').start();
        await sleep();
        spinner.error({ text: `Exited cleanly. Goodbye, ${loginUser.loginId}!` });
        process.exit(1);
    }
}
