const { prisma } = require("../utils/prisma");
const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
require('dotenv').config();

class AuthController {
    async authenticate(req, res) {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.json({ error: "Usuário não encontrado" })
        }

        const isValidPassword = await compare(password, user.password);

        if (!isValidPassword) {
            return res.json({ error: "Senha inválida" })
        }

        const token = sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const { id } = user;

        res.json({ user: { id, email }, token });
    }

}

module.exports = { AuthController };
