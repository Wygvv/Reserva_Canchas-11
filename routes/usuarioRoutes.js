const express = require('express')
const router = express.Router()

const usuarioController = require('../controllers/usuarioController')
const auth = require('../middleware/authMiddleware')

router.get(
  '/',
  auth,
  usuarioController.obtenerTodos
)

router.put(
  '/:id/rol',
  auth,
  usuarioController.actualizarRol
)

module.exports = router