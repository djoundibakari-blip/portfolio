const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const { validate, loginSchema, registerSchema } = require('../config/validations');

// Routes publiques
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

// Routes protégées
router.get('/profile', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, authController.updateProfile);
router.put('/password', authMiddleware, authController.updatePassword);
router.post('/verify-token', authMiddleware, authController.verifyToken);

// Routes admin
router.get('/users', authMiddleware, adminOnly, authController.getAllUsers);
router.delete('/users/:id', authMiddleware, adminOnly, authController.deleteUser);

module.exports = router;
