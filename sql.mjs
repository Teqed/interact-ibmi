#!/usr/bin/env node
import { sshcmd } from './ssh.mjs';

export async function sqlcmd() {
    const comm = await sshcmd({
        cmd: 'system "call qzdfmdb2 PARM(\'select * from teq1.tq001ap\')"'
    });
    if (comm.stdout) {
        console.log(comm.stdout);
    }
}