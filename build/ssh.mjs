#!/usr/bin/env ts-node
/* This is the module for connecting to the IBMi AS400.
It uses SSH and allowing the user to send custom commands. */
import { NodeSSH } from 'node-ssh';
import loginUser from './loginUser.mjs';
const ssh = new NodeSSH();
export const sshconnect = async () => {
    await ssh.connect({
        agent: process.env.SSH_AUTH_SOCK,
        compress: true,
        host: 'PUB400.COM',
        port: 2_222,
        privateKeyPath: 'C:/Users/Teq/.ssh/id_rsa',
        username: loginUser.loginId,
    });
};
export const sshcmd = async (input) => {
    const { cmd } = input;
    const comm = await ssh.execCommand(cmd, {
        stdin: input.stdin,
    });
    ssh.dispose();
    return comm;
};
export async function sshinteractive() {
    await sshconnect();
    const pipeStream = (stream) => {
        const { stdin, stdout, stderr, } = process;
        const { isTTY } = stdout;
        if (isTTY && stdin.setRawMode)
            stdin.setRawMode(true);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        stream.pipe(stdout);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        stream.stderr.pipe(stderr);
        stdin.pipe(stream);
        const onResize = isTTY && (() => 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        stream.setWindow(stdout.rows, stdout.columns, null, null));
        if (isTTY) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            stream.once('data', onResize);
            process.stdout.on('resize', onResize);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        stream.on('close', () => {
            if (isTTY)
                process.stdout.removeListener('resize', onResize);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            stream.unpipe();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            stream.stderr.unpipe();
            stdin.unpipe();
            if (stdin.setRawMode)
                stdin.setRawMode(false);
            stdin.unref();
        });
    };
    await new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        ssh.connection.shell({
            term: process.env.TERM ?? 'vt100',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, (error, stream) => {
            if (error) {
                reject(error);
                return;
            }
            pipeStream(stream);
            stream.on('close', () => resolve(true));
        });
    });
    ssh.dispose();
}
