'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reservas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      cancha_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'canchas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      hora_inicio: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      hora_fin: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      estado: {
        type: Sequelize.ENUM('pendiente', 'confirmada', 'cancelada'),
        defaultValue: 'pendiente',
      },
      precio_total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      notas: {
        type: Sequelize.TEXT,
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

    // Índice único para evitar doble reserva en el mismo slot
    await queryInterface.addIndex('reservas', ['cancha_id', 'fecha', 'hora_inicio'], {
      unique: true,
      name: 'reservas_cancha_fecha_hora_unique',
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('reservas');
  },
};
