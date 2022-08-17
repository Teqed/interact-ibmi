#!/usr/bin/env node
import { sshcmd } from './ssh.mjs';

export async function sqlcmd() {
    const comm = await sshcmd({
        cmd: `system -i "call qzdfmdb2 PARM('-d' '-i' '-t')"`,
        stdin: 'select * from teq1.tq0sdfsdfsd03ap',
//        stdin: `select * from Sysibm.columns where tbname = 'TQ001AP'`
    });
    if (comm.stdout) {
        console.log(comm.stdout);
        db2Parse(comm.stdout);
    }
}

async function db2Parse(stdout: string) {
    let recordsArray = new Array;
    let db2Error;
    let stdoutArray = stdout.split('\n').filter(String);
    stdoutArray.forEach((rawline, index) => {
        let line = rawline.trim();
        if (line === `**** CLI ERROR *****`) {
            db2Error = true;
            console.log(stdoutArray) // Debug
        }
        else if (line === `DB2>`) return;
        else if (line === `?>`) return;
        else recordsArray.push(line)
    })

    if (db2Error === true) console.log(`There was a CLI Error! Check your statement!`);
    console.log(recordsArray);
}