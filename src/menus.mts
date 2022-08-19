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
import {testOdbc, freeOdbc} from './odbc.mjs';
// eslint-disable-next-line no-promise-executor-return
const sleep = async (ms = 500) => new Promise(r => setTimeout(r, ms));

export async function welcome() {
	const rainbowTitle = chalkAnimation.rainbow(
		'Hello universe! \n',
	);

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
	}) as PromptModule;
	// eslint-disable-next-line @typescript-eslint/no-base-to-string
	return handleAnswer(menu['main' as keyof PromptModule].toString());
}

async function handleAnswer(answer: string) {
	if (answer === '1. Send System Command') {
		const spinner = createSpinner('Checking...').start();
		await sleep();
		spinner.stop();
		await sshconnect();
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		const command = await inquirer.prompt(
			{
				name: 'cmdinput',
				type: 'input',
				message: 'Enter command to send:',
			},
		) as PromptModule;
		// eslint-disable-next-line @typescript-eslint/no-base-to-string
		const commandStr: string = command['cmdinput' as keyof PromptModule].toString();
		const rtnCommand = await sshcmd({
			cmd: commandStr,
			stdin: '',
		});
		/* Find the output from rtnCommand */
		console.log(rtnCommand.stdout);
		console.log(rtnCommand.stderr);
	} else if (answer === '2. ODBC') {
		await testOdbc();
	} else if (answer === '3. FreeODBC') {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		const command = await inquirer.prompt(
			{
				name: 'cmdinput',
				type: 'input',
				message: 'Enter statement to send:',
			},
		) as PromptModule;
		// eslint-disable-next-line @typescript-eslint/no-base-to-string
		const statement: string = command['cmdinput' as keyof PromptModule].toString();
		// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
		const rtnStatement = await freeOdbc(statement);
		console.log(rtnStatement);
	} else if (answer === '4. SSH') {
		const spinner = createSpinner('Connecting to SSH...').start();
		await sleep();
		spinner.stop();
		// Remove        return sshinteractive();
	} else {
		const spinner = createSpinner('Exiting...').start();
		await sleep();
		spinner.error({text: `Exited cleanly. Goodbye, ${loginUser.loginId}!`});
		process.exit(1);
	}
}
