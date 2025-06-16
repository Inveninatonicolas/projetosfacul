const oracledb = require('oracledb');
const db = require('../config/db');


async function getAllAtendimentos() {
  let connection;
  try {
    connection = await db.getConnection();
    const result = await connection.execute('SELECT * FROM ATENDIMENTOS');
    return result.rows;
  } finally {
    if (connection) await connection.close();
  }
}

async function getAtendimentoById(id) {
  let connection;
  try {
    connection = await db.getConnection();
    const result = await connection.execute(
      'SELECT * FROM ATENDIMENTOS WHERE ID = :id',
      [id]
    );
    return result.rows[0];
  } finally {
    if (connection) await connection.close();
  }
}

async function createAtendimento(atendimento) {
  let connection;
  try {
    connection = await db.getConnection();
    await connection.execute(
      `INSERT INTO ATENDIMENTOS (ID, DATA, PACIENTE_ID, DESCRICAO) 
       VALUES (:id, TO_DATE(:data, 'YYYY-MM-DD'), :pacienteId, :descricao)`,
      [
        atendimento.id,
        atendimento.data,
        atendimento.pacienteId,
        atendimento.descricao
      ],
      { autoCommit: true }
    );
    return { message: 'Atendimento criado com sucesso!' };
  } finally {
    if (connection) await connection.close();
  }
}

async function updateAtendimento(id, atendimento) {
  let connection;
  try {
    connection = await db.getConnection();
    await connection.execute(
      `UPDATE ATENDIMENTOS 
       SET DATA = TO_DATE(:data, 'YYYY-MM-DD'), PACIENTE_ID = :pacienteId, DESCRICAO = :descricao
       WHERE ID = :id`,
      [
        atendimento.data,
        atendimento.pacienteId,
        atendimento.descricao,
        id
      ],
      { autoCommit: true }
    );
    return { message: 'Atendimento atualizado com sucesso!' };
  } finally {
    if (connection) await connection.close();
  }
}

async function deleteAtendimento(id) {
  let connection;
  try {
    connection = await db.getConnection();
    await connection.execute(
      'DELETE FROM ATENDIMENTOS WHERE ID = :id',
      [id],
      { autoCommit: true }
    );
    return { message: 'Atendimento excluído com sucesso!' };
  } finally {
    if (connection) await connection.close();
  }
}

module.exports = {
  getAllAtendimentos,
  getAtendimentoById,
  createAtendimento,
  updateAtendimento,
  deleteAtendimento
};
