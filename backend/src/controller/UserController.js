const { prisma } = require("../utils/prisma");
const { hash } = require('bcrypt');

class UserController {
    async store(req, res) {
        const { name, email, password } = req.body;
        const hash_password = await hash(password, 8);

        const user = await prisma.user.create({
            data: { name, 
                email, 
                password: hash_password, },
        });

        res.status(201).json(user);
    }

    async index(req, res) {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    }
}

module.exports = { UserController };
