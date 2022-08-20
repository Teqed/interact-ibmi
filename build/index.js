#!/usr/bin/env ts-node
/* This is the entry point for the application. It welcomes the user, asks for their username and password, then shows them the command line.
Then, they can run the start command to see the main menu. */
import Vorpal from 'vorpal';
import repl from 'vorpal-repl';
import { login } from './login.mjs';
import { welcome, mainmenu } from './menus.mjs';
const vorpal = new Vorpal();
await welcome();
export const connection = await login();
vorpal
    .command('start', 'Runs start().')
    .action(async () => start());
vorpal
    .delimiter('driver~$')
    .use(repl)
    .show();
async function start() {
    await mainmenu();
}
