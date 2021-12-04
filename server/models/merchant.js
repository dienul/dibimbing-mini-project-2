const { v4: uuidv4 } = require('uuid');
'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Merchant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Merchant.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    join_date: DataTypes.DATE,
    phone_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Merchants',
  });

  Merchant.beforeCreate(x => x.id = uuidv4());
  return Merchant;
};