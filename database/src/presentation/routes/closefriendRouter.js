const express = require('express');
const authenticateToken = require('../../utils/jwt/checkToken');
const connection = require('../../infrastructure/database/config');  // การเชื่อมต่อฐานข้อมูล

const ClosefriendController = require('../controllers/closefriendController');
const ClosefriendService = require('../../domain/services/closefriendService');
const MySQLClosefriendRepository = require('../../infrastructure/repositories/MySQLClosefriendRepository');

const closefriendRepository = new MySQLClosefriendRepository(connection);
const closefriendService = new ClosefriendService(closefriendRepository);
const closefriendController = new ClosefriendController(closefriendService);

const router = express.Router();

router.post('/addfriend', authenticateToken, async (req, res) => await closefriendController.addfriend(req, res));
router.patch('/updatestatus', authenticateToken, async (req, res) => await closefriendController.updatestatus(req, res));
router.delete('/deletefrined', authenticateToken, async (req, res) => await closefriendController.deletefriend(req, res));
router.get('/getaccepted', authenticateToken, async (req, res) => await closefriendController.getaccepted(req, res));
router.get('/getpending', authenticateToken, async (req, res) => await closefriendController.getpending(req, res));
router.get('/getAllStatusFriend', authenticateToken, async (req, res) => await closefriendController.getAllStatusFriend(req, res));

module.exports = router;