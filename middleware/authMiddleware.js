const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

module.exports = async (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      mensaje: 'Token requerido'
    });
  }

  const token = authHeader.split(' ')[1];

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const usuario = await Usuario.findByPk(
      decoded.id
    );

    if (!usuario) {
      return res.status(401).json({
        mensaje: 'Usuario no encontrado'
      });
    }

    req.usuario = {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol
    };

    next();

  } catch {

    return res.status(401).json({
      mensaje: 'Token inválido'
    });
  }
};