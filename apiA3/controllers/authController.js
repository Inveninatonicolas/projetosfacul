const jwt = require('jsonwebtoken');
const { getConnection } = require('../config/db');
require('dotenv').config();

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const conn = await getConnection();
    const result = await conn.execute(
      'SELECT * FROM usuarios WHERE email = :email AND password = :password',
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const user = result.rows[0];
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { login };