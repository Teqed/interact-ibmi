import * as Sequelize from '@sequelize/core';
import { initModels } from './models/init-models.js';

// eslint-disable-next-line import/no-mutable-exports
export let sequelize: Sequelize.Sequelize;
export default async function (loginId: string, loginPw: string, system = `PUB400.COM`) {
	sequelize = new Sequelize.Sequelize(`arbitrarydb`, `'${loginId}'`, `'${loginPw}'`, {
		benchmark: false,
		databaseVersion: `7.5`, // It takes two extra seconds to connect if this is not set.
		dialect: `ibmi`,
		dialectOptions: {
			odbcConnectionString: `DRIVER=IBM i Access ODBC Driver;SYSTEM=${system};UID=${loginId};PWD=${loginPw};`,
		},
		host: system,
		logging: false,
	});
	try {
		await sequelize.authenticate({ logging: false });
		// console.log(`Connection has been established successfully.`);
	} catch (error: unknown) {
		console.error(`Unable to connect to the database:`, error);
	}

	void initModels(sequelize);

	return sequelize;
}
