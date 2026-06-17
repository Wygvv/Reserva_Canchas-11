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
  const {
  nombre,
  tipo,
  precio_hora
} = req.body

if (!nombre || nombre.trim() === '') {
  return res.status(400).json({
    mensaje: 'Nombre obligatorio'
  })
}

if (!tipo) {
  return res.status(400).json({
    mensaje: 'Tipo obligatorio'
  })
}

if (
  !precio_hora ||
  precio_hora <= 0
) {
  return res.status(400).json({
    mensaje: 'Precio inválido'
  })
}
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