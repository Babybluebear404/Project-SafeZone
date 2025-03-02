const connection = require('../../infrastructure/database/config');  // การเชื่อมต่อฐานข้อมูล
const express = require('express');

const UserController = require('../controllers/userController');
const UserService = require('../../domain/services/UserService');
const MySQLUserRepository = require('../../infrastructure/repositories/MySQLUserRepository');

const userRepository = new MySQLUserRepository(connection);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = express.Router();

router.post('/register', async (req, res) => await userController.register(req, res));
router.post('/login', async (req, res) => await userController.login(req, res));

module.exports = router;
