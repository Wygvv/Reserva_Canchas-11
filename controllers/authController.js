const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        mensaje: 'Todos los campos son obligatorios'
      })
    }

    const usuarioExistente =
      await Usuario.findOne({
        where: { email }
      });

    if (usuarioExistente) {
      return res.status(400).json({
        mensaje: 'El correo ya está registrado'
      });
    }

    const usuario = await Usuario.create(req.body);

    res.status(201).json({
      mensaje: 'Usuario registrado',
      usuario
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        mensaje: 'Email y password son obligatorios'
      });
    }

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

exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        mensaje: 'Email y nueva contraseña son obligatorios'
      });
    }

    const usuario = await Usuario.findOne({
      where: { email }
    });

    if (!usuario) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado'
      });
    }

    usuario.password = newPassword;

    await usuario.save();

    res.json({
      mensaje: 'Contraseña actualizada correctamente'
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};