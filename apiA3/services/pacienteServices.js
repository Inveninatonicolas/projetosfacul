const oracledb = require('oracledb');
const db = require('../config/db');

const PacienteService = {
  async getAll() {
    const conn = await db.getConnection();
    const result = await conn.execute(`SELECT * FROM PACIENTES`);
    await conn.close();
    return result.rows;
  },

  async getById(id) {
    const conn = await db.getConnection();
    const result = await conn.execute(`SELECT * FROM PACIENTES WHERE ID = :id`, [id]);
    await conn.close();
    return result.rows[0];
  },

  async create(paciente) {
    const conn = await db.getConnection();
    await conn.execute(
      `INSERT INTO PACIENTES (ID, NOME, CPF, DATA_NASC) VALUES (PACIENTES_SEQ.NEXTVAL, :nome, :cpf, TO_DATE(:dataNasc, 'YYYY-MM-DD'))`,
      [paciente.nome, paciente.cpf, paciente.data_nasc],
      { autoCommit: true }
    );
    await conn.close();
  },

  async update(id, paciente) {
    const conn = await db.getConnection();
    await conn.execute(
      `UPDATE PACIENTES SET NOME = :nome, CPF = :cpf, DATA_NASC = TO_DATE(:dataNasc, 'YYYY-MM-DD') WHERE ID = :id`,
      [paciente.nome, paciente.cpf, paciente.data_nasc, id],
      { autoCommit: true }
    );
    await conn.close();
  },

  async delete(id) {
    const conn = await db.getConnection();
    await conn.execute(`DELETE FROM PACIENTES WHERE ID = :id`, [id], { autoCommit: true });
    await conn.close();
  }
};

module.exports = PacienteService;
