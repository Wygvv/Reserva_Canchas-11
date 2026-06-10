'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('canchas', [
      {
        nombre: 'Cancha Fútbol Norte',
        tipo: 'futbol',
        descripcion: 'Cancha de césped sintético para 11 jugadores',
        precio_hora: 25000,
        capacidad: 22,
        disponible: 1,
        imagen_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Cancha Tenis Central',
        tipo: 'tenis',
        descripcion: 'Cancha de tenis con superficie de polvo de ladrillo',
        precio_hora: 15000,
        capacidad: 4,
        disponible: 1,
        imagen_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Cancha Pádel 1',
        tipo: 'padel',
        descripcion: 'Cancha de pádel techada, iluminación LED',
        precio_hora: 18000,
        capacidad: 4,
        disponible: 1,
        imagen_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('canchas', null, {});
  },
};
