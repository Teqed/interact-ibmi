/* eslint-disable unicorn/filename-case */
/* eslint-disable canonical/filename-match-regex */
/* eslint-disable typescript-sort-keys/interface */
/* eslint-disable canonical/sort-keys */
import { type Sequelize, type Optional, DataTypes, Model } from '@sequelize/core';

export type TQ001APAttributes = {
	USERID: string;
	KEYCOLOR: string;
	ACCESS: boolean;
};

export type TQ001APOptionalAttributes = 'ACCESS' | 'KEYCOLOR' | 'USERID';
export type TQ001APCreationAttributes = Optional<TQ001APAttributes, TQ001APOptionalAttributes>;

export class TQ001AP
	extends Model<TQ001APAttributes, TQ001APCreationAttributes>
	implements TQ001APAttributes
{
	public static initModel(sequelize: Sequelize): typeof TQ001AP {
		// USERID and KEYCOLOR are a composite primary key
		// eslint-disable-next-line canonical/id-match
		return TQ001AP.init(
			{
				USERID: {
					allowNull: false,
					primaryKey: true,
					references: {
						key: `USERID`,
						model: `TQ001AP`,
					},
					type: DataTypes.STRING(10),
				},
				KEYCOLOR: {
					allowNull: false,
					primaryKey: true,
					references: {
						key: `KEYCOLOR`,
						model: `TQ001AP`,
					},
					type: DataTypes.STRING(10),
				},
				ACCESS: {
					allowNull: false,
					type: DataTypes.BOOLEAN,
				},
			},
			{
				schema: `TEQ1`,
				sequelize,
				tableName: `TQ001AP`,
				timestamps: false,
			},
		);
	}

	public declare USERID: string;

	public declare KEYCOLOR: string;

	public declare ACCESS: boolean;
}
