const { prisma } = require("../utils/prisma");

class UserController {
    async store(req, res) {
        const { name, email, password } = req.body;

        const user = await prisma.user.create({
            data: { name, email, password },
        });

        res.status(201).json(user);
    }
}

module.exports = { UserController };
