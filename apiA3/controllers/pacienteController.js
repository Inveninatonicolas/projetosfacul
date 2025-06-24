const PacienteService = require('../services/pacienteService');

class PacienteController {
    static async criar(req, res) {
        try {
            const novoPaciente = await PacienteService.create(req.body);
            res.status(201).json(novoPaciente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async listarTodos(req, res) {
        try {
            const pacientes = await PacienteService.getAll();
            res.status(200).json(pacientes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const paciente = await PacienteService.getById(req.params.id);
            paciente ? res.status(200).json(paciente) : res.status(404).json({ message: 'Paciente não encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async atualizar(req, res) {
        try {
            const pacienteAtualizado = await PacienteService.update(req.params.id, req.body);
            res.status(200).json(pacienteAtualizado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async excluir(req, res) {
        try {
            await PacienteService.delete(req.params.id);
            res.status(200).json({ message: 'Paciente excluído com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PacienteController;