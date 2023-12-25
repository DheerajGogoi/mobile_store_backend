const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '12h' });
};

const verifyToken = (req, res, next) => {
    const tokenHeader = req.header('Authorization');

    if (!tokenHeader) {
        return res.status(401).json({ success: false, message: 'Access denied. Token is missing.' });
    }

    const tokenParts = tokenHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ success: false, message: 'Invalid token format.' });
    }

    const token = tokenParts[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token.' });
    }
};

module.exports = { generateToken, verifyToken };
