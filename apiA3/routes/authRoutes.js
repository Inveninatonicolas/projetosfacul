const express = require('express');
const { login } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.get('/rota-protegida', auth, (req, res) => {
  res.json({ message: 'Acesso autorizado!', userId: req.userId });
});

module.exports = router;