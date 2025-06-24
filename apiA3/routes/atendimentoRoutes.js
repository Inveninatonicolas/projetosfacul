const express = require('express');
const router = express.Router();
const AtendimentoController = require('../controllers/atendimentoController');

router.post('/', AtendimentoController.criar);
router.get('/', AtendimentoController.listarTodos);
router.get('/:id', AtendimentoController.buscarPorId);
router.put('/:id', AtendimentoController.atualizar);
router.delete('/:id', AtendimentoController.excluir);

module.exports = router;