import { cmdOdbc } from '../../odbc-util';
import { CHGUSRPRF } from '../../qcmdexc-util';
import pickUser from './pickuser';

export default async function () {
	const enableThisUser = await pickUser();
	return await cmdOdbc(CHGUSRPRF({ STATUS: `*ENABLED`, USRPRF: enableThisUser }));
}
