const { Usuario } = require('../models')

exports.obtenerTodos = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll()
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.actualizarRol = async (req, res) => {
  try {

    const usuario = await Usuario.findByPk(req.params.id)

    if (!usuario) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado'
      })
    }

    usuario.rol = req.body.rol

    await usuario.save()

    res.json({
      mensaje: 'Rol actualizado',
      usuario
    })

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}