const express = require('express');
const { prisma } = require('./utils/prisma');
const { UserController } = require('./controller/UserController');
const { AuthController } = require('./controller/AuthController');
const { TaskController } = require('./controller/TaskController');
const { AuthMiddlewares } = require('./middlewares/auth');

const router = express.Router();

// Controllers
const userController = new UserController;
const authController = new AuthController;
const taskController = new TaskController;

// Rotas Users

router.post('/users', userController.store);
router.get('/users', AuthMiddlewares, userController.index);

// Rotas Auth

router.post('/auth', authController.authenticate);

// Rotas Tasks

// Criar Task
router.post('/tasks', AuthMiddlewares, taskController.createTask);

// Listar tasks
router.get('/tasks', AuthMiddlewares, taskController.getTasks);

// Atualizar o estado da tarefa
router.patch('/tasks/:id', AuthMiddlewares, taskController.updateTask);

// Deletar Task
router.delete('/tasks/:id', AuthMiddlewares, taskController.deleteTask);

module.exports = router;
