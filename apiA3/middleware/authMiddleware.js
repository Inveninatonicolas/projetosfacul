const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    const token =
        req.headers.authorization?.split(' ')[1] ||  
        req.cookies?.token ||                        
        req.body?.token;                            
    

    if (!token) {
        return res.status(401).json({ 
            error: "Acesso negado. Token não fornecido." 
        });
    }

   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
    } catch (error) {
        return res.status(401).json({ 
            error: "Token inválido ou expirado." 
        });
    }
};