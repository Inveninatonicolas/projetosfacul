require('dotenv').config();

const express = require('express');
const app = express();

const pacienteRoutes = require('./routes/pacienteRoutes');
const atendimentoRoutes = require('./routes/atendimentoRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');

require('./config/firebase');

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/atendimentos', atendimentoRoutes);

app.get('/', (req, res) => {
  res.send('API de Sistemas Distribuídos Rodando com Firebase...');
});


app.get('/rota-protegida', authMiddleware, (req, res) => {
    res.json({ message: "Você acessou uma rota protegida!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

module.exports = app;
