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

app.listen(5000, () => console.log("Server rodando"));