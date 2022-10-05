import { Sequelize, DataTypes, Model, Optional } from '@sequelize/core';

export interface TQ001APAttributes {
  USERID: string;
  KEYCOLOR: string;
  ACCESS: boolean;
}

export type TQ001APOptionalAttributes = "USERID" | "KEYCOLOR" | "ACCESS";
export type TQ001APCreationAttributes = Optional<TQ001APAttributes, TQ001APOptionalAttributes>;

export class TQ001AP extends Model<TQ001APAttributes, TQ001APCreationAttributes> implements TQ001APAttributes {
  declare USERID: string;
  declare KEYCOLOR: string;
  declare ACCESS: boolean;


  static initModel(sequelize: Sequelize): typeof TQ001AP {
    // USERID and KEYCOLOR are a composite primary key
    return TQ001AP.init({
      USERID: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'TQ001AP',
          key: 'USERID'
        }
      },
      KEYCOLOR: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'TQ001AP',
          key: 'KEYCOLOR'
        }
      },
      ACCESS: {
        type: DataTypes.BOOLEAN,
        allowNull: false
  }}, {
    sequelize,
    tableName: 'TQ001AP',
    schema: 'TEQ1',
    timestamps: false
  });
  }
}


