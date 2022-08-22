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

export const sshcmd = async (input: { cmd: string; stdin: string }) => {
	const { cmd } = input;
	const comm = await ssh.execCommand(cmd, {
		stdin: input.stdin,
	});
	ssh.dispose();
	return comm;
};

export const sshinteractive = async () => {
	const pipeStream = (stream: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		on: any;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		once?: any;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		pipe?: any;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		setWindow?: any;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		stderr?: any;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		unpipe?: any;
		// eslint-disable-next-line unicorn/consistent-function-scoping
	}) => {
		const { stdin, stdout, stderr } = process;
		const { isTTY } = stdout;

		if (isTTY && stdin.setRawMode) {
			stdin.setRawMode(true);
		}

		stream.pipe(stdout);

		stream.stderr.pipe(stderr);
		stdin.pipe(stream as unknown as NodeJS.WritableStream);

		const onResize = isTTY && (() => stream.setWindow(stdout.rows, stdout.columns, null, null));
		if (isTTY) {
			stream.once('data', onResize);
			process.stdout.on('resize', onResize as unknown as NodeJS.SignalsListener);
		}

		stream.on('close', () => {
			if (isTTY) {
				process.stdout.removeListener(
					'resize',
					onResize as unknown as NodeJS.SignalsListener,
				);
			}

			stream.unpipe();

			stream.stderr.unpipe();
			stdin.unpipe();
			if (stdin.setRawMode) {
				stdin.setRawMode(false);
			}

			stdin.unref();
		});
	};

	await new Promise((resolve, reject) => {
		ssh.connection.shell(
			{
				term: process.env.TERM ?? 'vt100',
			},
			(error: any, stream: { on: (argument0: string, argument1: () => void) => void }) => {
				if (error) {
					reject(error);
					return;
				}

				pipeStream(stream);
				stream.on('close', () => {
					resolve(true);
				});
			},
		);
	});

	ssh.dispose();
};
