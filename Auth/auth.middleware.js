const jwt = require('jsonwebtoken');

const JWT_SECRET = 'mralpacus';

exports.verifyToken = (req, res, next) => {
    const token = req.header("x-auth-token");
    
    if (!token) {
        return res.status(403).send({ message: 'Token no proporcionado' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Token no válido' });
    }
};
