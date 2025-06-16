require('dotenv').config();
const express = require('express');
const app = express();
const pacienteRoutes = require('./routes/pacienteRoutes');
const atendimentoRoutes = require('./routes/atendimentoRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');


connectDB();


app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/atendimentos', atendimentoRoutes);


app.get('/', (req, res) => {
  res.send('API de Sistemas Distribuídos Rodando...');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
