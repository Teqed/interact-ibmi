import { sequelize } from './connection.js';
import { type JOB_ATTROptionalAttributes, type JOB_ATTR } from './models/JOB_ATTR';

export default async function () {
	const jobAttributeAttributes: JOB_ATTROptionalAttributes[] = [`JOB`];
	const jobInfo = (await sequelize.models.JOB_ATTR.findOne({
		attributes: jobAttributeAttributes,
		type: `SELECT`,
		where: {
			JOB_NAME: `QZDASOINIT`,
		},
	})) as unknown as JOB_ATTR;

	const jobName = jobInfo.getDataValue(`JOB`);
	return jobName;
}
