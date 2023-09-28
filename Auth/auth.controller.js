const User = require('./auth.model');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'mralpacus';

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || req.body.password !== user.password) {
            return res.status(400).send({ message: 'Usuario o contraseña incorrecta' });
        }
        
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(500).send(error);
    }
};
