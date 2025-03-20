const { prisma } = require("../utils/prisma");

class TaskController {
    // Criar Task
    async createTask(req, res) {
        const { text } = req.body;

        const task = await prisma.task.create({
            data: { text },
        });
        
        res.status(201).json(task);
    }

    // Listar Tasks
    async getTasks(req, res) {
        const tasks = await prisma.task.findMany();
        res.status(200).json(tasks);
    }

    // Atualizar o estado da tarefa
    async updateTask(req, res) {
        const { id } = req.params;
        
        const task = await prisma.task.findUnique({
            where: {
                id
            }
        });

        if (!task) {
            return res.status(404).json({ error: "Tarefa não encontrada" });
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
