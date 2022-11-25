const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcyrpt = require('bcrypt');

class User extends Model {
  checkPassword(loginPw) {
    return bcyrpt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 12);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = User;