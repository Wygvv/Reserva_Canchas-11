'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('canchas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      tipo: {
        type: Sequelize.ENUM('futbol', 'tenis', 'padel', 'basketball', 'volleyball', 'otro'),
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      precio_hora: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      capacidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2,
      },
      disponible: {
        type: Sequelize.TINYINT(1),
        defaultValue: 1,
      },
      imagen_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('canchas');
  },
};
