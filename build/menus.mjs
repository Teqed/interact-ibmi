#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import { createSpinner } from 'nanospinner';
//import { sshcmd, sshconnect, sshinteractive } from './ssh.mjs';
import { sshconnect } from './ssh.mjs';
import { User } from './login.mjs';
import { sqlcmd } from './sql.mjs';
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
            '1. Diagnose',
            '2. Backup',
            '3. Update',
            '4. SSH',
        ],
    });
    return handleAnswer(menu.main);
}
async function handleAnswer(answer) {
    if (answer == '1. Diagnose') {
        const spinner = createSpinner('Checking...').start();
        await sleep();
        spinner.stop();
        await sshconnect();
        await sqlcmd();
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
