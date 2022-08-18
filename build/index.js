#!/usr/bin/env ts-node
import Vorpal from 'vorpal';
//import repl from 'vorpal-repl';
import { login } from './login.mjs';
import { welcome, mainmenu } from './menus.mjs';
let vorpal = new Vorpal();
await welcome();
await login();
vorpal
    .command('start', 'Runs start().')
    .action(function (args) {
    return start();
});
vorpal
    .delimiter('driver~$')
    //    .use(repl)
    .show();
async function start() {
    await mainmenu();
}
