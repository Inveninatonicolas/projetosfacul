const AuthService = require('../services/authService');

class AuthController {
    static async login(req, res) {
        try {
            const { email, senha } = req.body;
            
            if (!email || !senha) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios' });
            }
            
            const token = await AuthService.login(email, senha);
            res.status(200).json({ token });
            
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}

module.exports = AuthController;