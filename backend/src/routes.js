const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
    return res.json({hello: "world"});
});

// Criar task
router.post('/tasks', async (req, res) => {
    try {
        const task = await prisma.task.create({
            data: {
                text: req.body.text,
            },
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar tarefa" });
    }
});

// Listar tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar tarefas" });
    }
});

// Atualizar o estado da tarefa
router.patch('/tasks/:id', async (req, res) => {
    try {
        const task = await prisma.task.findUnique({
            where: {
                id: req.params.id
            }
        });

        if (!task) {
            return res.status(404).json({ error: "Tarefa não encontrada" });
        }

        const updatedTask = await prisma.task.update({
            where: {
                id: req.params.id
            },
            data: {
                completed: !task.completed
            },
        });

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar a tarefa" });
    }
});

// Deletar Task
router.delete('/tasks/:id', async (req, res) => {
    try {
        await prisma.task.delete({
            where: {
                id: req.params.id
            },
        });
        res.json({ message: 'Task deletada com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar a tarefa" });
    }
});

module.exports = router;
