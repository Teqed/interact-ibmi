import { sequelize } from './connection.js';

export default async (input: string) => {
	const [results, metadata] = await sequelize.query(input);
	return [results, metadata];
};
