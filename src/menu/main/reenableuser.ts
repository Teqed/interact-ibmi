import { cmdOdbc } from '../../odbc-util.js';
import { CHGUSRPRF } from '../../qcmdexc-util.js';
import pickUser from './pickuser.js';

export default async function () {
	const enableThisUser = await pickUser();
	return await cmdOdbc(CHGUSRPRF({ STATUS: `*ENABLED`, USRPRF: enableThisUser }));
}
