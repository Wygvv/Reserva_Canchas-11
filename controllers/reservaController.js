const { Reserva } = require('../models');

exports.obtenerTodas = async (req, res) => {
  const reservas = await Reserva.findAll();

  res.json(reservas);
};

exports.obtenerPorId = async (req, res) => {
  const reserva = await Reserva.findByPk(req.params.id);

  if (!reserva) {
    return res.status(404).json({
      mensaje: 'Reserva no encontrada'
    });
  }

  res.json(reserva);
};

exports.crear = async (req, res) => {

  const reserva = await Reserva.create({
    ...req.body,
    usuario_id: req.usuario.id
  });

  res.status(201).json(reserva);
};

exports.actualizar = async (req, res) => {

  const reserva = await Reserva.findByPk(req.params.id);

  if (!reserva) {
    return res.status(404).json({
      mensaje: 'Reserva no encontrada'
    });
  }

  await reserva.update(req.body);

  res.json(reserva);
};

exports.eliminar = async (req, res) => {

  const reserva = await Reserva.findByPk(req.params.id);

  if (!reserva) {
    return res.status(404).json({
      mensaje: 'Reserva no encontrada'
    });
  }

  await reserva.destroy();

  res.json({
    mensaje: 'Reserva eliminada'
  });
};