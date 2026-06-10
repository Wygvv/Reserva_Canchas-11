// API/config/database.js
// GEN-03: Conexión a BD con Sequelize + MySQL

require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'mysql',
    logging: console.log
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'mysql',
    logging: false
  }
};
 
 
 