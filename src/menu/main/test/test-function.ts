import ora from 'ora';
import { sleep } from '../../../util.js';
import { foundUsers } from '../../../util/find-users.js';
import updateOdbc from '../../../util/odbc/update-odbc.js';
import getJobLog from '../../../util/sequelize/print-job-log.js';
import insertTq001ap from '../../../util/sequelize/test/insert-tq001ap.js';
import viewTq001ap from '../../../util/sequelize/test/view-tq001ap.js';
import { genericGetCommand } from '../../generic.js';
import pickuser from '../help-user/pickuser.js';
import sequelizeFreeform from '../sequelize-freeform.js';
import testOdbc from './test-odbc.js';
import testSequelize from './test-sequelize.js';

export default async () => {
	console.log(await pickuser());
	return 0;
};
