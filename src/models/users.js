'use strict';
const {
  Model
} = require('sequelize');
const { genSaltSync, hashSync} = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
     
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      
    },
    phone :{
      type: DataTypes.STRING(15),
      
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM("Laki-laki","Perempuan"),
    
    },
    email: {
      type: DataTypes.STRING(255),
      
      allowNull:false,
    },
    password: {type : DataTypes.STRING, set(value) {
      const salt = genSaltSync(10);
      this.setDataValue('password', hashSync(value, salt));
    }}
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};