const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("payments", {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
    },
    userEmail:{
      type: DataTypes.STRING(50),
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },{
    timestamps: false,
  });
};