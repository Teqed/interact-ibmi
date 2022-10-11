import updateOdbc from '../../../util/odbc/update-odbc.js';
import { genericGetCommand } from '../../generic.js';
import sequelizeFreeform from '../sequelize-freeform.js';
import testOdbc from './test-odbc.js';
import testSequelize from './test-sequelize.js';

export default async () => {
	return sequelizeFreeform();
};
