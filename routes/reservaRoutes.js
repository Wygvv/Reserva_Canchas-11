const express = require('express');
const router = express.Router();

const reservaController = require('../controllers/reservaController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, reservaController.obtenerTodas);
router.get('/:id', auth, reservaController.obtenerPorId);

router.post('/', auth, reservaController.crear);
router.put('/:id', auth, reservaController.actualizar);
router.delete('/:id', auth, reservaController.eliminar);

module.exports = router;