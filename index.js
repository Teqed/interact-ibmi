#!/usr/bin/env node
import { login } from './login.mjs';
import { welcome, mainmenu } from './menus.mjs';
await welcome();
await login();
await mainmenu();