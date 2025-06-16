const atendimentoService = require('../services/atendimentoServices');

exports.buscarTodosAtendimentos = async (req, res) => {
  try {
    const atendimentos = await atendimentoService.buscarTodos();
    res.status(200).json(atendimentos);
  } catch (error) {
    console.error('Erro ao buscar atendimentos:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar atendimentos.' });
  }
};

exports.buscarAtendimentoPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const atendimento = await atendimentoService.buscarPorId(id);
    if (atendimento) {
      res.status(200).json(atendimento);
    } else {
      res.status(404).json({ mensagem: 'Atendimento não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar atendimento:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar atendimento.' });
  }
};

exports.criarAtendimento = async (req, res) => {
  const novoAtendimento = req.body;
  try {
    await atendimentoService.criar(novoAtendimento);
    res.status(201).json({ mensagem: 'Atendimento criado com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar atendimento:', error);
    res.status(500).json({ mensagem: 'Erro ao criar atendimento.' });
  }
};

exports.atualizarAtendimento = async (req, res) => {
  const id = req.params.id;
  const atendimentoAtualizado = req.body;
  try {
    await atendimentoService.atualizar(id, atendimentoAtualizado);
    res.status(200).json({ mensagem: 'Atendimento atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar atendimento:', error);
    res.status(500).json({ mensagem: 'Erro ao atualizar atendimento.' });
  }
};

exports.deletarAtendimento = async (req, res) => {
  const id = req.params.id;
  try {
    await atendimentoService.deletar(id);
    res.status(200).json({ mensagem: 'Atendimento excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir atendimento:', error);
    res.status(500).json({ mensagem: 'Erro ao excluir atendimento.' });
  }
};
