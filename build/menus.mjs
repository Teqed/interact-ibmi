#!/usr/bin/env ts-node
/* This is the menu system for the application. It shows the user options and lets them choose what they want to do.
 They can send commands to the IBMi or run SQL statements over ODBC connections. */
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
// Remove: import { sshcmd, sshconnect, sshinteractive } from './ssh.mjs';
import { loginUser } from './loginUser.mjs';
import { testOdbc, queryOdbc, findUser } from './odbc.mjs';
import { sshcmd, sshconnect } from './ssh.mjs';
import { sleep } from './util.mjs';
export const welcome = async () => {
    const rainbowTitle = chalkAnimation.rainbow('Hello universe! \n');
    await sleep();
    rainbowTitle.stop();
};
const getCommand = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const command = (await inquirer.prompt({
        message: 'Enter statement to send:',
        name: 'cmdinput',
        type: 'input',
    }));
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const statement = command['cmdinput'].toString();
    return statement;
};
const handleAnswer = async (answer) => {
    if (answer === '1. Send System Command') {
        const spinner = createSpinner('Checking...').start();
        await sleep();
        spinner.stop();
        await sshconnect();
        const statement = await getCommand();
        const rtnCommand = await sshcmd({
            cmd: statement,
            stdin: '',
        });
        /* Find the output from rtnCommand */
        console.log(rtnCommand.stdout);
        console.log(rtnCommand.stderr);
    }
    else if (answer === '2. Test ODBC') {
        const statement = await getCommand();
        await testOdbc(statement);
    }
    else if (answer === '3. FreeODBC') {
        const statement = await getCommand();
        await queryOdbc(statement);
    }
    else if (answer === '4. SSH') {
        const spinner = createSpinner('Connecting to SSH...').start();
        await sleep();
        spinner.stop();
        // Remove        return sshinteractive();
    }
    else if (answer === '5. Find User') {
        const spinner = createSpinner('Checking...').start();
        await findUser('TEQ');
        spinner.success({ text: 'User found!' });
    }
    else {
        const spinner = createSpinner('Exiting...').start();
        await sleep();
        spinner.error({ text: `Exited cleanly. Goodbye, ${loginUser.loginId}!` });
        process.exit(1);
    }
};
export const mainmenu = async () => {
    const menu = (await inquirer.prompt({
        choices: ['1. Send System Command', '2. Test ODBC', '3. FreeODBC', '4. SSH', '5. Find User'],
        message: `
    ${chalk.bgBlue('MAIN MENU')}
    Select options below.
    `,
        name: 'main',
        type: 'list',
    }));
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    await handleAnswer(menu['main'].toString());
};
