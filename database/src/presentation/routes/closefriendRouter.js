const express = require('express');
const authenticateToken = require('../../utils/jwt/checkToken');
const connection = require('../../infrastructure/database/config');  // การเชื่อมต่อฐานข้อมูล

const ClosefrienController = require('../controllers/closefriendController');
const ClosefrienService = require('../../domain/services/questionService');
const MySQLClosefrienRepository = require('../../infrastructure/repositories/MySQLClosefriendRepository');

const closefrienRepository = new MySQLClosefrienRepository(connection);
const closefrienService = new ClosefrienService(closefrienRepository);
const closefrienController = new ClosefrienController(closefrienService);

const router = express.Router();

module.exports = router;