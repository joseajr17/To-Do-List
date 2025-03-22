const { prisma } = require("../utils/prisma");
const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
require('dotenv').config();

class AuthController {
    async authenticate(req, res) {
        const { email, password } = req.body;

        try {
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." })
            }

            const isValidPassword = await compare(password, user.password);

            if (!isValidPassword) {
                return res.status(401).json({ error: "Senha inválida." })
            }

            const token = sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

            const { id } = user;

            res.json({ user: { id, email }, token });
        } catch (error) {
            console.error("Erro durante a autenticação:", error);
            res.status(500).json({ error: "Erro interno do servidor." });
        }
    }
}

module.exports = { AuthController };
