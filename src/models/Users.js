const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "users",
    {
      email: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Validar que el campo sea un email
        },
      },
      password: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: [5, 20], // Validar que la longitud de la contraseña sea entre 8 y 20 caracteres
          is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, // Validar que la contraseña contenga al menos una letra minúscula, una letra mayúscula y un número
        },
      },
      firstname: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
      },
      cp: {
        type: DataTypes.INTEGER(10),
      },
      city: {
        type: DataTypes.STRING(50),
      },
      country: {
        type: DataTypes.STRING(50),
      },
      phone: {
        type: DataTypes.STRING(50),
      },
      customerStatus: {
        //! Aca se cambio costumer por customer
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      userType: {
        type: DataTypes.STRING(50),
      },
      adminType: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
      },
      token: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
      },
      updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  );
};
