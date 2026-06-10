const express = require('express');
const router = express.Router();

const canchaController = require('../controllers/canchaController');
const auth = require('../middleware/authMiddleware');

router.get('/', canchaController.obtenerTodas);
router.get('/:id', canchaController.obtenerPorId);

router.post('/', auth, canchaController.crear);
router.put('/:id', auth, canchaController.actualizar);
router.delete('/:id', auth, canchaController.eliminar);

module.exports = router;