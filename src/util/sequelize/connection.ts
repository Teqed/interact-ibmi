import * as Sequelize from '@sequelize/core';

// eslint-disable-next-line import/no-mutable-exports
export let sequelize: Sequelize.Sequelize;
export default async function (loginId: string, loginPw: string, system = `PUB400.COM`) {
	sequelize = new Sequelize.Sequelize(`IBMiDSN`, `'${loginId}'`, `'${loginPw}'`, {
		dialect: `ibmi`,
		host: system,
	});
	try {
		await sequelize.authenticate();
		console.log(`Connection has been established successfully.`);
	} catch (error: unknown) {
		console.error(`Unable to connect to the database:`, error);
	}
}
