const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ordersDetails", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    units: {
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.FLOAT,
    },
    taxAmount: {
      // El valor del impuesto multiplicado por el valor del producto y por las cantidades
      type: DataTypes.FLOAT,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
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