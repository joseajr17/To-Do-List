const express = require('express');
const { prisma } = require('./utils/prisma');
const { UserController } = require('./controller/UserController');
const { TaskController } = require('./controller/TaskController');

const router = express.Router();

// Controllers
const userController = new UserController;
const taskController = new TaskController;

// Rotas Users

router.post('/users', userController.store);

// Rotas Tasks

// Criar Task
router.post('/tasks', taskController.createTask);

// Listar tasks
router.get('/tasks', taskController.getTasks);

// Atualizar o estado da tarefa
router.patch('/tasks/:id', taskController.updateTask);

// Deletar Task
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
