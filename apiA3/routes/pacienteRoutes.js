const express = require('express');
const router = express.Router();
const PacienteController = require('../controllers/pacienteController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', PacienteController.criar);
router.get('/', PacienteController.listarTodos);
router.get('/:id', PacienteController.buscarPorId);
router.put('/:id', PacienteController.atualizar);
router.delete('/:id', PacienteController.excluir);

module.exports = router;