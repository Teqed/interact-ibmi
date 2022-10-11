import { sequelize } from './connection.js';

export default async (input: string) => {
	// Use sequelize to select a record
	// Start by initializing the models

	return await sequelize.query(input);
};
