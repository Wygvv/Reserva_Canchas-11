'use strict';
// API/models/Reserva.js
// rq-02: Entidad secundaria — relación entre Usuario y Cancha

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Reserva extends Model {}

  Reserva.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cancha_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: { msg: 'La fecha no es válida' },
          isAfterToday(value) {
            if (new Date(value) < new Date().setHours(0, 0, 0, 0)) {
              throw new Error('No se puede reservar en una fecha pasada');
            }
          },
        },
      },
      hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      hora_fin: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      estado: {
        type: DataTypes.ENUM('pendiente', 'confirmada', 'cancelada'),
        defaultValue: 'pendiente',
      },
      precio_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      notas: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Reserva',
      tableName: 'reservas',
    }
  );

  // Asociaciones
  Reserva.associate = (models) => {
    Reserva.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      as: 'usuario',
    });
    Reserva.belongsTo(models.Cancha, {
      foreignKey: 'cancha_id',
      as: 'cancha',
    });
  };

  return Reserva;
};
