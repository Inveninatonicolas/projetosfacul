const jwt = require('jsonwebtoken');
const { auth, signInWithEmailAndPassword } = require('../config/firebase');

class AuthService {
    static async login(email, senha) {
        try {
            
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;
            
            
            const token = jwt.sign(
                { uid: user.uid, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            
            return token;
        } catch (error) {
            console.error("Erro no login:", error.message);
            throw new Error('Credenciais inválidas');
        }
    }
}

module.exports = AuthService;