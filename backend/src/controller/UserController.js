const { prisma } = require("../utils/prisma");
const { hash } = require('bcrypt');

class UserController {
    async store(req, res) {
        const { name, email, password } = req.body;

        const existsUser = await prisma.user.findUnique({ where: { email }, });

        if (existsUser) {
            return res.status(400).json({ error: "Email já está em uso." });
        }

        const hash_password = await hash(password, 8);

        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hash_password,
                },
            });
            res.status(201).json(user);
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            res.status(500).json({ error: "Erro ao criar usuário." });
        }
    }

    async index(req, res) {
        try {
            const users = await prisma.user.findMany();
            res.status(200).json(users);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            res.status(500).json({ error: "Erro ao buscar usuários." });
        }
    }
}

module.exports = { UserController };
