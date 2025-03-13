const express = require('express');
const authenticateToken = require('../../utils/jwt/checkToken');
const connection = require('../../infrastructure/database/config');  // การเชื่อมต่อฐานข้อมูล

const MySQLDiaryRepository = require('../../infrastructure/repositories/MySQLDiaryRepository');
const DiaryService = require('../../domain/services/diaryService');
const DiaryController = require('../controllers/diaryController');

const diaryRepository = new MySQLDiaryRepository(connection);
const diaryService = new DiaryService(diaryRepository);
const diaryController = new DiaryController(diaryService);

const router = express.Router();

router.post('/adddiary', authenticateToken, async (req, res) => await diaryController.adddiary(req, res));
router.get('/getdiary', authenticateToken, async (req, res) => await diaryController.getdiary(req, res));
router.get('/getsharediary', authenticateToken, async (req, res) => await diaryController.getsharediary(req, res));
router.delete('/deletediary', authenticateToken, async (req, res) => await diaryController.deletediary(req, res));
router.get('/average-feeling', authenticateToken, async (req, res) => await diaryController.getAverageFeeling(req, res));
router.get('/average-aifeeling', authenticateToken, async (req, res) => await diaryController.getAverageAIFeeling(req, res));
router.get('/feeling', authenticateToken, async (req, res) => await diaryController.getFeeling(req, res));
router.get('/aifeeling', authenticateToken, async (req, res) => await diaryController.getAIFeeling(req, res));

module.exports = router;