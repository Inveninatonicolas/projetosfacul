const express = require('express');
const router = express.Router();
const atendimentoController = require('../controllers/atendimentoController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, atendimentoController.buscarTodosAtendimentos);
router.get('/:id', authMiddleware, atendimentoController.buscarAtendimentoPorId);
router.post('/', authMiddleware, atendimentoController.criarAtendimento);
router.put('/:id', authMiddleware, atendimentoController.atualizarAtendimento);
router.delete('/:id', authMiddleware, atendimentoController.deletarAtendimento);

module.exports = router;
