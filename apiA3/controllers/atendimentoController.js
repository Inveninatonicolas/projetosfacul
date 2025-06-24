const AtendimentoService = require('../services/atendimentoService');

class AtendimentoController {
    static async criar(req, res) {
        try {
            const novoAtendimento = await AtendimentoService.create(req.body);
            res.status(201).json(novoAtendimento);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async listarTodos(req, res) {
        try {
            const atendimentos = await AtendimentoService.getAll();
            res.status(200).json(atendimentos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const atendimento = await AtendimentoService.getById(req.params.id);
            atendimento ? res.status(200).json(atendimento) : res.status(404).json({ message: 'Atendimento não encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async atualizar(req, res) {
        try {
            const atendimentoAtualizado = await AtendimentoService.update(req.params.id, req.body);
            res.status(200).json(atendimentoAtualizado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async excluir(req, res) {
        try {
            await AtendimentoService.delete(req.params.id);
            res.status(200).json({ message: 'Atendimento excluído com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = AtendimentoController;