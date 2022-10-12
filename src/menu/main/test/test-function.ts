import updateOdbc from '../../../util/odbc/update-odbc.js';
import getJobLog from '../../../util/sequelize/print-job-log.js';
import { genericGetCommand } from '../../generic.js';
import sequelizeFreeform from '../sequelize-freeform.js';
import testOdbc from './test-odbc.js';
import testSequelize from './test-sequelize.js';
import viewTq001ap from '../../../util/sequelize/test/view-tq001ap.js';
import insertTq001ap from '../../../util/sequelize/test/insert-tq001ap.js';

export default async () => {
	return insertTq001ap();
};
