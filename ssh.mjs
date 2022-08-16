#!/usr/bin/env node
import { NodeSSH } from 'node-ssh';
import { User } from './login.mjs';

const ssh = new NodeSSH()

export async function sshconnect() {
await ssh.connect({
    host: 'PUB400.COM',
    username: User.loginID,
    privateKeyPath: `C:/Users/Teq/.ssh/id_rsa`,
    port:2222,
    agent: process.env.SSH_AUTH_SOCK,
    compress: true,
})
}

export async function sshcmd() {
    await ssh.execCommand('system "call qzdfmdb2 PARM(\'select * from teq1.tq001ap\')"').then(function(result){
        console.log(result.stdout)
    })
    ssh.dispose()
}

export async function sshinteractive() {
    await sshconnect()
    const pipeStream = stream => {
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
        ssh.connection.shell({term: process.env.TERM || 'vt100'}, (err, stream) => {
            if (err) {
                reject(err)
                return
            }
            pipeStream(stream)
            stream.on('close', () => resolve(true))
        })
    })

    ssh.dispose()
}
