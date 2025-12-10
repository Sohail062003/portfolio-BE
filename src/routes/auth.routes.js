const express = require('express');
const router = express.Router();

const { authController } = require('../controllers');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/registerUser', authController.registerUser);
router.post('/loginUser', authController.loginUser);
router.get('/verify-token', authMiddleware, authController.verifyToken);

module.exports = router;
