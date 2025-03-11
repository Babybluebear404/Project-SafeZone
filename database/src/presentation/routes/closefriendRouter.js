const express = require('express');
const authenticateToken = require('../../utils/jwt/checkToken');
const connection = require('../../infrastructure/database/config');  // การเชื่อมต่อฐานข้อมูล

const ClosefrienController = require('../controllers/closefriendController');
const ClosefrienService = require('../../domain/services/closefriendService');
const MySQLClosefrienRepository = require('../../infrastructure/repositories/MySQLClosefriendRepository');

const closefrienRepository = new MySQLClosefrienRepository(connection);
const closefrienService = new ClosefrienService(closefrienRepository);
const closefrienController = new ClosefrienController(closefrienService);

const router = express.Router();

router.post('/addfriend', authenticateToken, async (req, res) => await closefrienController.addfriend(req, res));
router.patch('/updatestatus', authenticateToken, async (req, res) => await closefrienController.updatestatus(req, res));
router.delete('/deletefrined', authenticateToken, async (req, res) => await closefrienController.deletefriend(req, res));

module.exports = router;