/* This is the menu system for the application.
 It shows the user options and lets them choose what they want to do.
 They can send commands to the IBMi or run SQL inputCommands over ODBC connections. */
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
// Remove: import { sshcmd, sshconnect, sshinteractive } from './ssh.mjs';
import loginUser from './loginUser.js';
import { testOdbc, findUser, copyUser } from './testOdbc.js';
import { sshcmd, sshconnect, sshinteractive } from './ssh.js';
import { sleep } from './util.js';
/* Create an array of strings containing menu choices. */
const menuChoices = [
    '1. Send System Command',
    '2. Test ODBC',
    '3. Test CopyUser',
    '4. SSH',
    '5. Find User',
];
export const welcome = async () => {
    const rainbowTitle = chalkAnimation.rainbow('Hello universe! \n');
    await sleep();
    rainbowTitle.stop();
    return 0;
};
const getCommand = async () => {
    const command = (await inquirer.prompt({
        message: 'Enter inputCommand to send:',
        name: 'cmdinput',
        type: 'input',
    }));
    const inputCommand = command['cmdinput'].toString();
    return inputCommand;
};
const handleAnswer = async (answer) => {
    /* A case inputCommand for answer */
    switch (answer) {
        case menuChoices[0]: {
            const inputCommand = await getCommand();
            const rtnCommand = await sshcmd({
                cmd: inputCommand,
                stdin: '',
            });
            /* Find the output from rtnCommand */
            console.log(rtnCommand.stdout);
            console.log(rtnCommand.stderr);
            break;
        }
        case menuChoices[1]: {
            const inputCommand = await getCommand();
            await testOdbc(inputCommand);
            break;
        }
        case menuChoices[2]: {
            const fromUser = await getCommand();
            const toUser = await getCommand();
            const toUserText = await getCommand();
            await copyUser(fromUser, toUser, toUserText);
            break;
        }
        case menuChoices[3]: {
            const spinner = createSpinner('Connecting to SSH...').start();
            await sshconnect();
            spinner.success({
                mark: '✅',
                text: 'Connected!',
            });
            await sshinteractive();
            break;
        }
        case menuChoices[4]: {
            const spinner = createSpinner('Checking...').start();
            await findUser('TEQ');
            spinner.success({
                text: 'User found!',
            });
            break;
        }
        default: {
            const spinner = createSpinner('Exiting...').start();
            await sleep();
            spinner.error({
                text: `Exited cleanly. Goodbye, ${loginUser.loginId}!`,
            });
            /* Throw an error to exit the program */
            throw new Error('Exited cleanly.');
        }
    }
    return handleAnswer;
};
export const mainmenu = async () => {
    const menu = (await inquirer.prompt({
        choices: menuChoices,
        message: `
    ${chalk.bgBlue('MAIN MENU')}
    Select options below.
    `,
        name: 'main',
        type: 'list',
    }));
    await handleAnswer(menu['main'].toString());
};
