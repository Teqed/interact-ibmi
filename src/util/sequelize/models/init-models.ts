import { type Sequelize } from '@sequelize/core';
import { TQ001AP as _TQ001AP } from './TQ001AP';

// eslint-disable-next-line func-style
export function initModels(sequelize: Sequelize) {
	// eslint-disable-next-line canonical/id-match
	const TQ001AP = _TQ001AP.initModel(sequelize);

	return {
		TQ001AP,
	};
}

export { type TQ001APCreationAttributes, TQ001AP, type TQ001APAttributes } from './TQ001AP';
