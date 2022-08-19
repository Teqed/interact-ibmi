#!/usr/bin/env ts-node
/* This is the module for connecting to the IBMi AS400 using SSH and allowing the user to send custom commands. */
import {NodeSSH} from 'node-ssh';
import {loginUser} from './login.mjs';

const ssh = new NodeSSH();

export async function sshconnect() {
	await ssh.connect({
		host: 'PUB400.COM',
		username: loginUser.loginId,
		privateKeyPath: 'C:/Users/Teq/.ssh/id_rsa',
		port: 2222,
		agent: process.env.SSH_AUTH_SOCK,
		compress: true,
	});
}

export async function sshcmd(input: {cmd: string; stdin: string}) {
	const {cmd} = input;
	const comm = await ssh.execCommand(cmd, {
		stdin: input.stdin,
	});
	ssh.dispose();
	return comm;
}
/*
Remove export async function sshinteractive() {
    await sshconnect()
    const pipeStream = (stream: { on: any; pipe?: any; stderr?: any; setWindow?: any; once?: any; unpipe?: any; }) => {
        const {stdin, stdout, stderr} = process
        const {isTTY} = stdout

        if (isTTY && stdin.setRawMode) stdin.setRawMode(true)

        stream.pipe(stdout)
        stream.stderr.pipe(stderr)
        stdin.pipe(stream)

        const onResize =
            isTTY && (() => stream.setWindow(stdout.rows, stdout.columns, null, null))
        if (isTTY) {
            stream.once('data', onResize)
            process.stdout.on('resize', onResize)
        }
        stream.on('close', () => {
            if (isTTY) process.stdout.removeListener('resize', onResize)
            stream.unpipe()
            stream.stderr.unpipe()
            stdin.unpipe()
            if (stdin.setRawMode) stdin.setRawMode(false)
            stdin.unref()
        })
    }

    await new Promise((resolve, reject) => {
        ssh.connection.shell({term: process.env.TERM || 'vt100'}, (err: any, stream: { on: (arg0: string, arg1: () => void) => void; }) => {
            if (err) {
                reject(err)
                return
            }
            pipeStream(stream)
            stream.on('close', () => resolve(true))
        })
    })

    ssh.dispose()
} */
