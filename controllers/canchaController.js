const { Cancha } = require('../models');

exports.obtenerTodas = async (req, res) => {
  const canchas = await Cancha.findAll();
  res.json(canchas);
};

exports.obtenerPorId = async (req, res) => {
  const cancha = await Cancha.findByPk(req.params.id);

  if (!cancha) {
    return res.status(404).json({
      mensaje: 'Cancha no encontrada'
    });
  }

  res.json(cancha);
};

exports.crear = async (req, res) => {
  const cancha = await Cancha.create(req.body);

  res.status(201).json(cancha);
};

exports.actualizar = async (req, res) => {
  const cancha = await Cancha.findByPk(req.params.id);

  if (!cancha) {
    return res.status(404).json({
      mensaje: 'Cancha no encontrada'
    });
  }

  await cancha.update(req.body);

  res.json(cancha);
};

exports.eliminar = async (req, res) => {
  const cancha = await Cancha.findByPk(req.params.id);

  if (!cancha) {
    return res.status(404).json({
      mensaje: 'Cancha no encontrada'
    });
  }

  await cancha.destroy();

  res.json({
    mensaje: 'Cancha eliminada'
  });
};