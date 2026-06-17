const { Reserva, Cancha, Usuario } = require('../models');

exports.obtenerTodas = async (req, res) => {

  const { fecha, cancha_id } = req.query;

  const where = {};

  if (fecha) {
    where.fecha = fecha;
  }

  if (cancha_id) {
    where.cancha_id = cancha_id;
  }

  // Si no es admin, solo ve sus reservas
if (req.usuario.rol !== 'admin') {
  where.usuario_id = req.usuario.id;
}

const reservas = await Reserva.findAll({
  where,
  include: [
    {
      model: Cancha,
      as: 'cancha'
    },
    {
      model: Usuario,
      as: 'usuario'
    }
  ]
});

  res.json(reservas);
};

exports.obtenerPorId = async (req, res) => {
  const reserva = await Reserva.findByPk(req.params.id);
  
  if (!reserva) {
    return res.status(404).json({
      mensaje: 'Reserva no encontrada'
    });
  }

  if (
  req.usuario.rol !== 'admin' &&
  reserva.usuario_id !== req.usuario.id
) {
  return res.status(403).json({
    mensaje: 'No autorizado'
  });
}

  res.json(reserva);
};

exports.crear = async (req, res) => {

  const {
    cancha_id,
    fecha,
    hora_inicio,
    hora_fin
  } = req.body;

  if (
  !cancha_id ||
  !fecha ||
  !hora_inicio ||
  !hora_fin
) {
  return res.status(400).json({
    mensaje: 'Todos los campos son obligatorios'
  })
}

  // Regla de negocio: no permitir fechas pasadas
  const hoy = new Date();
  const fechaReserva = new Date(fecha);

  if (isNaN(fechaReserva.getTime())) {
  return res.status(400).json({
    mensaje: 'Fecha inválida'
  });
}

  hoy.setHours(0, 0, 0, 0);
  fechaReserva.setHours(0, 0, 0, 0);

  if (fechaReserva < hoy) {
    return res.status(400).json({
      mensaje: 'No se puede reservar una fecha pasada'
    });
  }

  // Regla de negocio: evitar reservas duplicadas
  const reservaExistente = await Reserva.findOne({
    where: {
      cancha_id,
      fecha,
      hora_inicio,
      hora_fin
    }
  });

  if (reservaExistente) {
    return res.status(400).json({
      mensaje: 'La cancha ya está reservada para ese horario'
    });
  }

  const cancha = await Cancha.findByPk(cancha_id);

if (!cancha) {
  return res.status(404).json({
    mensaje: 'Cancha no encontrada'
  });
}

const horaInicio = parseInt(
  hora_inicio.split(':')[0]
);

const horaFin = parseInt(
  hora_fin.split(':')[0]
);

if (horaFin <= horaInicio) {
  return res.status(400).json({
    mensaje: 'Hora fin debe ser mayor a hora inicio'
  })
}

const horasReservadas =
  horaFin - horaInicio;

  const precio_total =
  horasReservadas *
  cancha.precio_hora;

 const reserva = await Reserva.create({
  cancha_id,
  fecha,
  hora_inicio,
  hora_fin,
  precio_total,
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

  if (
    req.usuario.rol !== 'admin' &&
    reserva.usuario_id !== req.usuario.id
  ) {
    return res.status(403).json({
      mensaje: 'No autorizado'
    });
  }

  await reserva.destroy();

  res.json({
    mensaje: 'Reserva eliminada'
  });
};
exports.estadisticas = async (req, res) => {

  const totalReservas = await Reserva.count();

  res.json({
    totalReservas
  });
};