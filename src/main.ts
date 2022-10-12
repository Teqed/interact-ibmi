#! /usr/bin/env node
/* eslint-disable node/shebang */
import login from './menu/login/login.js';
import mainMenu from './menu/main/menu-main.js';
// import findUsers from './util/find-users.js';
import findUsers from './util/sequelize/find-users.js';
// import { welcome } from './util.js';

process.title = `interact-ibmi`;

// eslint-disable-next-line import/no-mutable-exports
let foundUserDiagnostics;

const start = async () => {
	try {
		// await welcome();
		await login();
		foundUserDiagnostics = findUsers();
		await mainMenu();
	} catch (error: unknown) {
		console.log(error);
	}
};

// eslint-disable-next-line import/prefer-default-export
export { foundUserDiagnostics };

await start();
