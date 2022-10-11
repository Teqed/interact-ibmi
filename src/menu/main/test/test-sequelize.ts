import { sequelize } from '../../../util/sequelize/connection.js';
import { TQ001AP, type TQ001APAttributes } from '../../../util/sequelize/models/TQ001AP.js';

export default async function () {
	// eslint-disable-next-line canonical/id-match
	TQ001AP.initModel(sequelize);
	// Make sure any unaccounted for promises are resolved
	await new Promise(resolve => {
		setTimeout(resolve, 1);
	});
	// const generateSQL = sequelize.queryInterface.queryGenerator.selectQuery(`TQ001AP`);
	// console.log(generateSQL);
	console.time(`test-sequelize`);

	const result = sequelize.models.TQ001AP.findOne({
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		where: {
			KEYCOLOR: `Red`,
			USERID: `Adam`,
		} as TQ001APAttributes,
	});
	const result2 = sequelize.models.TQ001AP.findOne({
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		where: {
			KEYCOLOR: `Red`,
			USERID: `Adam`,
		} as TQ001APAttributes,
	});
	const result3 = sequelize.models.TQ001AP.findOne({
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		where: {
			KEYCOLOR: `Red`,
			USERID: `Adam`,
		} as TQ001APAttributes,
	});
	const result4 = sequelize.models.TQ001AP.findOne({
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		where: {
			KEYCOLOR: `Red`,
			USERID: `Adam`,
		} as TQ001APAttributes,
	});
	const result5 = sequelize.models.TQ001AP.findOne({
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		where: {
			KEYCOLOR: `Red`,
			USERID: `Adam`,
		} as TQ001APAttributes,
	});
	// Wait for all promises to resolve
	await Promise.all([result, result2, result3, result4, result5]);
	console.timeEnd(`test-sequelize`);
	return result;
}
