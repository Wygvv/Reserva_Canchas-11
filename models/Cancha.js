'use strict';
// API/models/Cancha.js
// rq-01: Entidad principal del dominio

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Cancha extends Model {}

  Cancha.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'El nombre de la cancha es obligatorio' },
        },
      },
      tipo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'El tipo de cancha es obligatorio' },
          isIn: {
            args: [['futbol', 'tenis', 'padel', 'basketball', 'volleyball', 'otro']],
            msg: 'Tipo de cancha no válido',
          },
        },
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      precio_hora: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: { msg: 'El precio debe ser un número válido' },
          min: { args: [0], msg: 'El precio no puede ser negativo' },
        },
      },
      capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        validate: {
          min: { args: [1], msg: 'La capacidad mínima es 1' },
        },
      },
      disponible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      imagen_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Cancha',
      tableName: 'canchas',
    }
  );

  // Asociaciones
  Cancha.associate = (models) => {
    Cancha.hasMany(models.Reserva, {
      foreignKey: 'cancha_id',
      as: 'reservas',
    });
  };

  return Cancha;
};
