const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

exports.register = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);

    res.status(201).json({
      mensaje: 'Usuario registrado',
      usuario
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({
      where: { email }
    });

    if (!usuario) {
      return res.status(401).json({
        mensaje: 'Credenciales inválidas'
      });
    }

    const valido = await usuario.validarPassword(password);

    if (!valido) {
      return res.status(401).json({
        mensaje: 'Credenciales inválidas'
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h'
      }
    );

    res.json({
      token,
      usuario
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};