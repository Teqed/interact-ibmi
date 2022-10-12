/* eslint-disable canonical/id-match */
import { type Sequelize } from '@sequelize/core';
import { JOB_ATTR as _JOB_ATTR } from './JOB_ATTR.js';
import { TQ001AP as _TQ001AP } from './TQ001AP.js';
import { USER_INFO_BASIC as _USER_INFO_BASIC } from './USER_INFO_BASIC.js';

// eslint-disable-next-line func-style
export function initModels(sequelize: Sequelize) {
	const TQ001AP = _TQ001AP.initModel(sequelize);
	const USER_INFO_BASIC = _USER_INFO_BASIC.initModel(sequelize);
	const JOB_ATTR = _JOB_ATTR.initModel(sequelize);

	return {
		JOB_ATTR,
		TQ001AP,
		USER_INFO_BASIC,
	};
}

export { type TQ001APCreationAttributes, TQ001AP, type TQ001APAttributes } from './TQ001AP.js';
export {
	type USER_INFO_BASICCreationAttributes,
	USER_INFO_BASIC,
	type USER_INFO_BASICAttributes,
} from './USER_INFO_BASIC.js';
export { type JOB_ATTRCreationAttributes, JOB_ATTR, type JOB_ATTRAttributes } from './JOB_ATTR.js';
