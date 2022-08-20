#!/usr/bin/env ts-node
/* This is the module for running SQL commands using DB2. It is depreciated and never called. */
import {sshcmd} from './ssh.mjs';

// eslint-disable-next-line func-style
export async function sqlcmd() {
	const comm = await sshcmd({
		cmd: 'system -i "call qzdfmdb2 PARM(\'-d\' \'-i\' \'-t\')"',
		stdin: 'select * from teq1.tq0sdfsdfsd03ap',
		//        Stdin: `select * from Sysibm.columns where tbname = 'TQ001AP'`
	});
	if (comm.stdout) {
		console.log(comm.stdout);
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		database2Parse(comm.stdout);
	}
}

// eslint-disable-next-line func-style, @typescript-eslint/require-await, canonical/id-match
async function database2Parse(stdout: string) {
	const recordsArray = [];
	// eslint-disable-next-line canonical/id-match
	let database2Error;
	const stdoutArray = stdout.split('\n').filter(String);
	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	for (const [index, rawline] of stdoutArray.entries()) {
		const line = rawline.trim();
		if (line === '**** CLI ERROR *****') {
			database2Error = true;
			console.log(stdoutArray); // Debug
		} else if (line === 'DB2>') {
			continue;
		} else if (line === '?>') {
			continue;
		} else {
			recordsArray.push(line);
		}
	}

	if (database2Error === true) {
		console.log('There was a CLI Error! Check your statement!');
	}

	console.log(recordsArray);
}
