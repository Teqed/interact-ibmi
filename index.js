#!/usr/bin/env node

// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

/*
let chalk = require('chalk');
let inquirer = require('inquirer');
let gradient = require('gradient-string');
let chalkAnimation = require('chalk-animation');
let figlet = require('figlet');
let { createSpinner } = require('nanospinner');
*/
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
const {NodeSSH} = require('node-ssh')

console.log(chalk.bgGreen('Program initiating...'));

let userName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Hello universe! \n'
    );

    await sleep();
    rainbowTitle.stop();
}

async function login() {
    const loginid = await inquirer.prompt({
        name: 'login_name',
        type: 'input',
        message: 'What is your User ID?',
        default() {
            return 'Anon';
        },
    });
    userName = loginid.login_name;
}

async function mainmenu() {
    
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
    if(answer == '4. SSH') {
        const spinner = createSpinner('Connecting to SSH...').start();
        await sleep();
        spinner.stop();
        return sshf();
    } else {
        const spinner = createSpinner('Exiting...').start();
        await sleep();
        spinner.error({ test: `Exited cleanly. Goodbye, ${userName}!` });
        process.exit(1);
    }
}

async function sshf() {
    const ssh = new NodeSSH()
    await ssh.connect({
        host: 'PUB400.COM',
        username: 'TEQ',
        privateKeyPath: 'C:/Users/Teq/.ssh/id_rsa',
        port:2222,
        agent: process.env.SSH_AUTH_SOCK,
        compress: true,
    })

    const pipeStream = stream => {
        const {stdin, stdout, stderr} = process
        const {isTTY} = stdout

        if (isTTY && stdin.setRawMode) stdin.setRawMode(true)

        stream.pipe(stdout)
        stream.stderr.pipe(stderr)
        stdin.pipe(stream)

        const onResize =
            isTTY && (() => stream.setWindow(stdout.rows, stdout.columns, null, null))
        if (isTTY) {
            stream.once('data', onResize)
            process.stdout.on('resize', onResize)
        }
        stream.on('close', () => {
            if (isTTY) process.stdout.removeListener('resize', onResize)
            stream.unpipe()
            stream.stderr.unpipe()
            stdin.unpipe()
            if (stdin.setRawMode) stdin.setRawMode(false)
            stdin.unref()
        })
    }

    await new Promise((resolve, reject) => {
        ssh.connection.shell({term: process.env.TERM || 'vt100'}, (err, stream) => {
            if (err) {
                reject(err)
                return
            }
            pipeStream(stream)
            stream.on('close', () => resolve(true))
        })
    })

    ssh.dispose()
}



await welcome();
await login();
await mainmenu();


async function ssh() {
    const {NodeSSH} = require('node-ssh')

    const ssh = new NodeSSH()
    await ssh.connect({
        host: 'PUB400.COM',
        username: 'TEQ',
        privateKeyPath: 'C:/Users/Teq/.ssh/id_rsa',
        port:2222,
        agent: process.env.SSH_AUTH_SOCK,
        compress: true,
    })

    const pipeStream = stream => {
        const {stdin, stdout, stderr} = process
        const {isTTY} = stdout

        if (isTTY && stdin.setRawMode) stdin.setRawMode(true)

        stream.pipe(stdout)
        stream.stderr.pipe(stderr)
        stdin.pipe(stream)

        const onResize =
            isTTY && (() => stream.setWindow(stdout.rows, stdout.columns, null, null))
        if (isTTY) {
            stream.once('data', onResize)
            process.stdout.on('resize', onResize)
        }
        stream.on('close', () => {
            if (isTTY) process.stdout.removeListener('resize', onResize)
            stream.unpipe()
            stream.stderr.unpipe()
            stdin.unpipe()
            if (stdin.setRawMode) stdin.setRawMode(false)
            stdin.unref()
        })
    }

    await new Promise((resolve, reject) => {
        ssh.connection.shell({term: process.env.TERM || 'vt100'}, (err, stream) => {
            if (err) {
                reject(err)
                return
            }
            pipeStream(stream)
            stream.on('close', () => resolve(true))
        })
    })

    ssh.dispose()
}

