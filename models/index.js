// API/models/index.js
// Carga todos los modelos y registra asociaciones

'use strict';

const sequelize = require('../config/sequelize');

const Usuario = require('./Usuario')(sequelize);
const Cancha  = require('./Cancha')(sequelize);
const Reserva = require('./Reserva')(sequelize);

const models = { Usuario, Cancha, Reserva };

// Ejecutar asociaciones
Object.values(models).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

module.exports = { sequelize, ...models };
