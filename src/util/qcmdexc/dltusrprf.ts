export default (parameters: ParametersDLTUSRPRF) => {
	// Create a string that says 'DLTUSRPRF ..." and then add the parameters. Skip any that are undefined.
	let command = `DLTUSRPRF USRPRF(${parameters.USRPRF})`;

	// const addParameter = (parameter: string | undefined, value: string | undefined) => {
	// if (parameter !== undefined && value !== undefined) {
	// command += ` ${parameter}(${value})`;
	// }
	// };
	if (parameters.OWNOBJOPT !== undefined) command += ` OWNOBJOPT(${parameters.OWNOBJOPT})`;

	if (parameters.PGPOPT !== undefined) command += ` PGPOPT(${parameters.PGPOPT})`;

	if (parameters.EIMASSOC !== undefined) command += ` EIMASSOC(${parameters.EIMASSOC})`;

	return command;
};

export type ParametersDLTUSRPRF = {
	EIMASSOC?: string | undefined;
	OWNOBJOPT?: string | undefined;
	PGPOPT?: string | undefined;
	USRPRF: string; // 1-366
};
