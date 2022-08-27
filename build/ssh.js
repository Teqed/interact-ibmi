// const ssh = new NodeSSH();
export const sshconnect = async () => {
    // await ssh.connect({
    // 	agent: process.env.SSH_AUTH_SOCK,
    // 	compress: true,
    // 	host: `PUB400.COM`,
    // 	port: 2_222,
    // 	privateKeyPath: `C:/Users/Teq/.ssh/id_rsa`,
    // 	username: loginUser.loginId,
    // });
};
export const sshcmd = async (input) => {
    const { cmd, stdin } = input;
    // const comm = await ssh.execCommand(cmd, {
    // 	stdin,
    // });
    // ssh.dispose();
    // return comm;
};
export const sshinteractive = async () => {
    const pipeStream = (stream) => {
        const { stdin, stdout, stderr } = process;
        const { isTTY, columns, rows } = stdout;
        if (isTTY && stdin.setRawMode) {
            stdin.setRawMode(true);
        }
        stream.pipe(stdout);
        stream.stderr.pipe(stderr);
        stdin.pipe(stream);
        const onResize = isTTY && (() => stream.setWindow(rows, columns));
        if (isTTY) {
            stream.once(`data`, onResize);
            process.stdout.on(`resize`, onResize);
        }
        stream.on(`close`, () => {
            if (isTTY) {
                process.stdout.removeListener(`resize`, onResize);
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
        // ssh.connection.shell(
        // 	{
        // 		term: process.env.TERM ?? `vt100`,
        // 	},
        // 	(
        // 		error: unknown,
        // 		stream: { on: (argument0: string, argument1: () => void) => void },
        // 	) => {
        // 		if (error) {
        // 			reject(error);
        // 			return;
        // 		}
        // 		pipeStream(stream);
        // 		stream.on(`close`, () => {
        // 			resolve(true);
        // 		});
        // 	},
        // );
    });
    // ssh.dispose();
};
