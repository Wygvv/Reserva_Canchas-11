'use strict';
// API/models/Usuario.js
// GEN-04, GEN-05: Modelo de usuarios con hash de contraseña

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  class Usuario extends Model {
    // Método para comparar contraseñas
    async validarPassword(password) {
      return bcrypt.compare(password, this.password);
    }

    // Ocultar campos sensibles en JSON
    toJSON() {
      const values = { ...this.get() };
      delete values.password;
      delete values.reset_token;
      delete values.reset_token_expira;
      return values;
    }
  }

  Usuario.init(
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
          notEmpty: { msg: 'El nombre no puede estar vacío' },
          len: { args: [2, 100], msg: 'El nombre debe tener entre 2 y 100 caracteres' },
        },
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: { msg: 'El email ya está registrado' },
        validate: {
          isEmail: { msg: 'Ingresa un email válido' },
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: { args: [6, 255], msg: 'La contraseña debe tener al menos 6 caracteres' },
        },
      },
      rol: {
        type: DataTypes.ENUM('admin', 'cliente'),
        defaultValue: 'cliente',
      },
      reset_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      reset_token_expira: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Usuario',
      tableName: 'usuarios',
      hooks: {
        // Hash automático antes de crear o actualizar contraseña
        beforeCreate: async (usuario) => {
          if (usuario.password) {
            usuario.password = await bcrypt.hash(usuario.password, 10);
          }
        },
        beforeUpdate: async (usuario) => {
          if (usuario.changed('password')) {
            usuario.password = await bcrypt.hash(usuario.password, 10);
          }
        },
      },
    }
  );

  // Asociaciones
  Usuario.associate = (models) => {
    Usuario.hasMany(models.Reserva, {
      foreignKey: 'usuario_id',
      as: 'reservas',
    });
  };

  return Usuario;
};
