const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("orders", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    amount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    taxAmount: {
      //! Aca debería ir una FK
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    shipping: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    orderStatus: {
      type: DataTypes.STRING(6),
      defaultValue: 'Cart',
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },{
    timestamps: false,
  });
};