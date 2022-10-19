/* eslint-disable complexity */
import { type ParametersCHGUSRPRF } from '../types.js';
import { qualifyObject } from './qcmdexc-util.js';

export default (parameters: ParametersCHGUSRPRF) => {
	// Create a string that says 'CHGUSRPRF ..." and then add the parameters. Skip any that are undefined.
	let command = `CHGUSRPRF USRPRF(${parameters.USRPRF})`;

	// const addParameter = (parameter: string | undefined, value: string | undefined) => {
	// if (parameter !== undefined && value !== undefined) {
	// command += ` ${parameter}(${value})`;
	// }
	// };
	if (parameters.PASSWORD !== undefined) command += ` PASSWORD(${parameters.PASSWORD})`;
	if (parameters.PWDEXP !== undefined) command += ` PWDEXP(${parameters.PWDEXP})`;
	if (parameters.STATUS !== undefined) command += ` STATUS(${parameters.STATUS})`;
	if (parameters.USRCLS !== undefined) command += ` USRCLS(${parameters.USRCLS})`;
	if (parameters.ASTLVL !== undefined) command += ` ASTLVL(${parameters.ASTLVL})`;
	if (parameters.CURLIB !== undefined) command += ` CURLIB(${qualifyObject(parameters.CURLIB)})`;
	if (parameters.INLPGM !== undefined) command += ` INLPGM(${qualifyObject(parameters.INLPGM)})`;
	if (parameters.INLMNU !== undefined) command += ` INLMNU(${qualifyObject(parameters.INLMNU)})`;
	if (parameters.LMTCPB !== undefined) command += ` LMTCPB(${parameters.LMTCPB})`;
	if (parameters.TEXT !== undefined) command += ` TEXT(${parameters.TEXT})`;
	if (parameters.SPCAUT !== undefined) command += ` SPCAUT(${parameters.SPCAUT.join(`,`)})`;
	if (parameters.SPCENV !== undefined) command += ` SPCENV(${parameters.SPCENV})`;
	if (parameters.DSPSGNINF !== undefined) command += ` DSPSGNINF(${parameters.DSPSGNINF})`;
	if (parameters.PWDEXPITV !== undefined) command += ` PWDEXPITV(${parameters.PWDEXPITV})`;
	if (parameters.PWDCHGBLK !== undefined) command += ` PWDCHGBLK(${parameters.PWDCHGBLK})`;
	if (parameters.LCLPWDMGT !== undefined) command += ` LCLPWDMGT(${parameters.LCLPWDMGT})`;
	if (parameters.LMTDEVSSN !== undefined) command += ` LMTDEVSSN(${parameters.LMTDEVSSN})`;
	if (parameters.KBDBUF !== undefined) command += ` KBDBUF(${parameters.KBDBUF})`;
	if (parameters.MAXSTGLRG !== undefined) command += ` MAXSTGLRG(${parameters.MAXSTGLRG})`;
	if (parameters.MAXSTG !== undefined) {
		// Cap the user's maximum storage to 2.147483647 GB.
		// It's still possible to exceed this limit by using the *NOMAX option.
		// This prevents an unusually large integer from being passed to the command and the system rejecting it.
		let cappedMAXSTG = parameters.MAXSTG.toString();
		if (parameters.MAXSTG >= 2_147_483_647) {
			cappedMAXSTG = `2147483647`;
		}

		command += ` MAXSTG(${cappedMAXSTG})`;
	}

	if (parameters.PTYLMT !== undefined) command += ` PTYLMT(${parameters.PTYLMT})`;
	if (parameters.JOBD !== undefined) command += ` JOBD(${qualifyObject(parameters.JOBD)})`;
	if (parameters.GRPPRF !== undefined) command += ` GRPPRF(${parameters.GRPPRF})`;
	if (parameters.OWNER !== undefined) command += ` OWNER(${parameters.OWNER})`;
	if (parameters.GRPAUT !== undefined) command += ` GRPAUT(${parameters.GRPAUT})`;
	if (parameters.GRPAUTTYP !== undefined) command += ` GRPAUTTYP(${parameters.GRPAUTTYP})`;
	if (parameters.SUPGRPPRF !== undefined)
		command += ` SUPGRPPRF(${parameters.SUPGRPPRF.join(`,`)})`;
	if (parameters.ACGCDE !== undefined) command += ` ACGCDE(${parameters.ACGCDE})`;
	if (parameters.DOCPWD !== undefined) command += ` DOCPWD(${parameters.DOCPWD})`;
	if (parameters.MSGQ !== undefined) command += ` MSGQ(${qualifyObject(parameters.MSGQ)})`;
	if (parameters.DLVRY !== undefined) command += ` DLVRY(${parameters.DLVRY})`;
	if (parameters.SEV !== undefined) command += ` SEV(${parameters.SEV})`;
	if (parameters.PRTDEV !== undefined) command += ` PRTDEV(${parameters.PRTDEV})`;
	if (parameters.OUTQ !== undefined) command += ` OUTQ(${qualifyObject(parameters.OUTQ)})`;
	if (parameters.ATNPGM !== undefined) command += ` ATNPGM(${qualifyObject(parameters.ATNPGM)})`;
	if (parameters.SRTSEQ !== undefined) command += ` SRTSEQ(${qualifyObject(parameters.SRTSEQ)})`;
	if (parameters.LANGID !== undefined) command += ` LANGID(${parameters.LANGID})`;
	if (parameters.CNTRYID !== undefined) command += ` CNTRYID(${parameters.CNTRYID})`;
	if (parameters.CCSID !== undefined) command += ` CCSID(${parameters.CCSID})`;
	if (parameters.CHRIDCTL !== undefined) command += ` CHRIDCTL(${parameters.CHRIDCTL})`;
	if (parameters.SETJOBATR !== undefined)
		command += ` SETJOBATR(${parameters.SETJOBATR.join(`,`)})`;
	if (parameters.LOCALE !== undefined) command += ` LOCALE(${parameters.LOCALE})`;
	if (parameters.USROPT !== undefined) command += ` USROPT(${parameters.USROPT.join(`,`)})`;
	if (parameters.UID !== undefined) command += ` UID(${parameters.UID})`;
	if (parameters.GID !== undefined) command += ` GID(${parameters.GID})`;
	if (parameters.HOMEDIR !== undefined) command += ` HOMEDIR(${parameters.HOMEDIR})`;
	if (parameters.EIMASSOC !== undefined) {
		command +=
			parameters.EIMASSOC === `*NOCHG`
				? ` EIMASSOC(*NOCHG)`
				: ` EIMASSOC(\
${parameters.EIMASSOC.ACTION} \
${parameters.EIMASSOC.ASSOC} \
${parameters.EIMASSOC.CREATE}\
${parameters.EIMASSOC.EIMID})`;
		// TODO: Does EIMASSOC work correctly?
	}

	if (parameters.USREXPDATE !== undefined)
		command += ` USREXPDATE(${parameters.USREXPDATE.toString()})`;
	// TODO: Does Date toString() return the correct format?
	if (parameters.USREXPITV !== undefined) command += ` USREXPITV(${parameters.USREXPITV})`;
	return command;
};
