const { verify } = require('jsonwebtoken');
require('dotenv').config();

function AuthMiddlewares(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).json({ error: "Token no provided" });
    }

    const [, token] = authorization.split(" ");

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        const { id } = decoded;

        req.userId = id;
        
        next();

    } catch (error) {
        return res.status(401).json({ error: "Token invalid" })
    }
}

module.exports = { AuthMiddlewares };
