const express = require('express');
const connection = require('../../infrastructure/database/config');  // การเชื่อมต่อฐานข้อมูล
const OtpRepository = require('../../infrastructure/repositories/OtpRepository');
const OtpService = require('../../domain/services/OtpService');
const OtpController = require('../controllers/OtpController');
const EmailService = require('../../infrastructure/email/EmailService');

const emailService = new EmailService();
const otpRepository = new OtpRepository(connection);
const otpService = new OtpService(otpRepository, emailService);
const otpController = new OtpController(otpService);

const router = express.Router();

router.post('/send-otp', async (req, res) => await otpController.sendOtp(req, res));
router.get('/verify-otp', async (req, res) => await otpController.verifyOtp(req, res));

module.exports = router;