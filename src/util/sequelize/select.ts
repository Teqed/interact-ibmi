import { sequelize } from './connection.js';
import { TQ001AP } from './models/TQ001AP.js';

export default async (table: string) => {
	// Use sequelize to select a record
	// Start by initializing the models

	// eslint-disable-next-line canonical/id-match
	TQ001AP.initModel(sequelize);

	const query = await sequelize.models[table].findAll({});
	console.log(query);
};
