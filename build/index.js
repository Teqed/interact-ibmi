/* This is the entry point for the application.
It welcomes the user, asks for their username and password, then shows them the command line.
Then, they can run the start command to see the main menu. */
import { login } from './login.js';
import { welcome, mainmenu } from './menus.js';
// eslint-disable-next-line import/prefer-default-export
export const viteNodeApp = async () => {
    await welcome();
    await login();
    await mainmenu();
};
