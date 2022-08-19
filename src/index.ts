#!/usr/bin/env ts-node
import Vorpal from 'vorpal';
// Import repl from 'vorpal-repl';
import {login} from './login.mjs';
import {welcome, mainmenu} from './menus.mjs';
const vorpal = new Vorpal();
await welcome();
await login();
vorpal
	.command('start', 'Runs start().')
	.action(async (args: Vorpal.Args) => start());
vorpal
	.delimiter('driver~$')
//    .use(repl)
	.show();
async function start() {
	await mainmenu();
}
