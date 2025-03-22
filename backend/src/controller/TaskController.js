const { prisma } = require("../utils/prisma");

class TaskController {
    // Criar Task
    async createTask(req, res) {
        const { text } = req.body;
        const userId = req.userId;

        const task = await prisma.task.create({
            data: {
                text,
                PkUserId: userId,
            },
        });

        res.status(201).json(task);
    }

    // Listar Tasks
    async getTasks(req, res) {
        const userId = req.userId;

        try {
            const tasks = await prisma.task.findMany({
                where: { PkUserId: userId },
            });
            res.status(200).json(tasks);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
            res.status(500).json({ error: "Erro ao buscar tarefas." });
        }
    }

    // Atualizar o estado da tarefa
    async updateTask(req, res) {
        const { id } = req.params;

        const task = await prisma.task.findUnique({ where: { id } });

        if (!task) {
            return res.status(404).json({ error: "Task não encontrada" });
        }

        const updatedTask = await prisma.task.update({
            where: {
                id
            },
            data: {
                completed: !task.completed
            },
        });

        res.json(updatedTask);
    }

    // Deletar Task
    async deleteTask(req, res) {
        const { id } = req.params;

        await prisma.task.delete({
            where: {
                id
            },
        });
        res.json({ message: 'Task deletada com sucesso!' });
    }
}

module.exports = { TaskController };
