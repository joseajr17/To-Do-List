const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const app = express();
app.use(express.json());

// CRUD

// Criar task
app.post('/tasks', async (req, res) => {
    let task = await prisma.task.create({
        data: {
            text: req.body.text,
        },
    });
    res.status(201).json(task);
})

// Listar tasks
app.get('/tasks', async (req, res) => {
    let tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
});

// Atualizar o estado da tarefa
app.patch('/tasks/:id', async (req, res) => {
    try {
        // Busca a tarefa pelo ID
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
app.delete('/tasks/:id', async (req, res) => {
    await prisma.task.delete({
        where: {
            id: req.params.id
        },
    });
    res.json({message: 'Task deletada com sucesso!'});
});

app.listen(5000, () => console.log("Server rodando"));