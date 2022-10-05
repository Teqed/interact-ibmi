import type { Sequelize } from "@sequelize/core";
import { TQ001AP as _TQ001AP } from "./TQ001AP";
import type { TQ001APAttributes, TQ001APCreationAttributes } from "./TQ001AP";

export {
  _TQ001AP as TQ001AP,
};

export type {
  TQ001APAttributes,
  TQ001APCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const TQ001AP = _TQ001AP.initModel(sequelize);


  return {
    TQ001AP: TQ001AP,
  };
}
