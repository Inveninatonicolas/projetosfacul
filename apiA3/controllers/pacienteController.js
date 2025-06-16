const oracledb = require('oracledb');

exports.getAllPacientes = async (req, res) => {
  try {
    const conn = await oracledb.getConnection();
    const result = await conn.execute('SELECT * FROM PACIENTES');
    res.json(result.rows);
    await conn.close();
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar pacientes');
  }
};

exports.createPaciente = async (req, res) => {
  const { nome, email, telefone } = req.body;
  try {
    const conn = await oracledb.getConnection();
    await conn.execute(
      `INSERT INTO PACIENTES (ID, NOME, EMAIL, TELEFONE) VALUES (paciente_seq.NEXTVAL, :nome, :email, :telefone)`,
      { nome, email, telefone },
      { autoCommit: true }
    );
    res.send('Paciente criado com sucesso!');
    await conn.close();
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar paciente');
  }
};

