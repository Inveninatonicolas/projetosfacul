const { auth } = require('../config/firebase');

exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.status(403).json({ error: 'Token não fornecido' });

  try {
    // Verifica token com Firebase
    const decoded = await auth.verifyIdToken(token);
    req.user = { uid: decoded.uid, email: decoded.email };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};