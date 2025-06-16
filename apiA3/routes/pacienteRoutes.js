const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const auth = require('../middleware/auth');

router.get('/', auth, pacienteController.getAllPacientes);
router.post('/', auth, pacienteController.createPaciente);

module.exports = router;
