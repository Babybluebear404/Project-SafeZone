const express = require('express');
const authenticateToken = require('../../utils/jwt/checkToken');
const connection = require('../../infrastructure/database/config');  // การเชื่อมต่อฐานข้อมูล

const QuestionController = require('../controllers/questionController');
const QuestionService = require('../../domain/services/questionService');
const MySQLQuestionRepository = require('../../infrastructure/repositories/MySQLquestionRepository');

const questionRepository = new MySQLQuestionRepository(connection);
const questionService = new QuestionService(questionRepository);
const questionController = new QuestionController(questionService);

const router = express.Router();

router.post('/savequestion', authenticateToken, async (req, res) => await questionController.savequestion(req, res));
router.get('/getquestion', authenticateToken, async (req, res) => await questionController.getquestion(req, res));

module.exports = router;