"use strict";
const { Model } = require("sequelize");
const utils = require("../utils/generateUniqueId");

module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employee.init(
    {
      Id: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultValue: () => {
          const randomId = utils.genrateUUI();
          return randomId;
        },
        primaryKey: true,
      },
      firstName: { type: DataTypes.STRING(100) },
      lastName: { type: DataTypes.STRING(100) },
      emailAddress: { type: DataTypes.STRING(150) }
    },
    {
      sequelize,
      modelName: "employee",
    }
  );
  return employee;
};
