export default (frmusr: string, tousr: string, tousnm: string, usrem?: string) => {
	// This calls a custom program to create the user profile.
	// It's only of use for my own purposes.
	// You could, in theory, swap in your own program here, if you're using this as an example.
	let command = `HORIZONLIB/CPYNAVUSR \
FRMUSR(''${frmusr}'') \
TOUSR(''${tousr}'') \
TOUSNM(''${tousnm}'')`;
	if (usrem !== undefined) command += ` USREM(''${usrem}'')`;

	return command;
};
