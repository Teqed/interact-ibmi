#!/usr/bin/env node
import chalk from 'chalk';
import { User, login } from './login.mjs';
import { welcome, mainmenu } from './menus.mjs';

console.log(chalk.bgGreen('Program initiating...'));
await welcome();
await login();
await mainmenu();
User.what();