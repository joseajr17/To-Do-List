import express from 'express';
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const app = express();

// CRUD

// Criar task
app.post('/tasks', async (req, res) => {
    let task = await prisma.task.create({
        data: {
            text: req.body.text
        },
    });
    res.json(task);
})

// Listar tasks
app.get('/task', async (req, res) => {
    let tasks = await prisma.task.findMany();
    res.json(tasks);
});

// Atualizar tarefa p/ concluída
app.patch('/task:id', async (req, res) => {
    const task = await prisma.task.update({
        where: {
            id: req.params.id
        },
        data: {
            completed: true
        },
    });
    res.json(task);
});

// Deletar Task
app.delete('/task/:id', async (req, res) => {
    await prisma.task.delete({
        where: {
            id: req.params.id
        },
    });
    res.json({message: 'Task deletada com sucesso!'});
});

app.listen(5000, () => console.log("Server rodando"));