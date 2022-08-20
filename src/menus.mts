#!/usr/bin/env ts-node
/* This is the menu system for the application. It shows the user options and lets them choose what they want to do.
 They can send commands to the IBMi or run SQL statements over ODBC connections. */
import chalk from 'chalk';
import inquirer, {PromptModule} from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import {createSpinner} from 'nanospinner';
// Remove: import { sshcmd, sshconnect, sshinteractive } from './ssh.mjs';
import {sshcmd, sshconnect} from './ssh.mjs';
import {loginUser} from './login.mjs';
import {testOdbc, queryOdbc, findUser} from './odbc.mjs';
import {sleep} from './util.mjs';

export async function welcome() {
	const rainbowTitle = chalkAnimation.rainbow('Hello universe! \n');
	await sleep();
	rainbowTitle.stop();
}

export async function mainmenu() {
	const menu = (await inquirer.prompt({
		name: 'main',
		type: 'list',
		message: `
    ${chalk.bgBlue('MAIN MENU')}
    Select options below.
    `,
		choices: ['1. Send System Command', '2. Test ODBC', '3. FreeODBC', '4. SSH', '5. Find User'],
	})) as PromptModule;
	// eslint-disable-next-line @typescript-eslint/no-base-to-string
	return handleAnswer(menu['main' as keyof PromptModule].toString());
}

async function handleAnswer(answer: string) {
	if (answer === '1. Send System Command') {
		const spinner = createSpinner('Checking...').start();
		await sleep();
		spinner.stop();
		await sshconnect();
		const statement: string = await getCommand();
		const rtnCommand = await sshcmd({
			cmd: statement,
			stdin: '',
		});
		/* Find the output from rtnCommand */
		console.log(rtnCommand.stdout);
		console.log(rtnCommand.stderr);
	} else if (answer === '2. Test ODBC') {
		const statement: string = await getCommand();
		await testOdbc(statement);
	} else if (answer === '3. FreeODBC') {
		const statement: string = await getCommand();
		await queryOdbc(statement);
	} else if (answer === '4. SSH') {
		const spinner = createSpinner('Connecting to SSH...').start();
		await sleep();
		spinner.stop();
		// Remove        return sshinteractive();
	} else if (answer === '5. Find User') {
		const spinner = createSpinner('Checking...').start();
		await findUser('TEQ');
		spinner.success({text: 'User found!'});
	} else {
		const spinner = createSpinner('Exiting...').start();
		await sleep();
		spinner.error({text: `Exited cleanly. Goodbye, ${loginUser.loginId}!`});
		process.exit(1);
	}
}

async function getCommand() {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
	const command = (await inquirer.prompt({
		name: 'cmdinput',
		type: 'input',
		message: 'Enter statement to send:',
	})) as PromptModule;
	// eslint-disable-next-line @typescript-eslint/no-base-to-string
	const statement: string = command['cmdinput' as keyof PromptModule].toString();
	return statement;
}
