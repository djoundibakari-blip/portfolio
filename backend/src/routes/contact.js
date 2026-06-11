const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const { validate, contactSchema } = require('../config/validations');

// Routes publiques
router.post('/', validate(contactSchema), contactController.sendMessage);

// Routes admin (protégées)
router.get('/messages', authMiddleware, adminOnly, contactController.getMessages);
router.get('/messages/:id', authMiddleware, adminOnly, contactController.getMessageById);
router.get('/statistics', authMiddleware, adminOnly, contactController.getContactStatistics);
router.get('/unread-count', authMiddleware, adminOnly, contactController.getUnreadCount);
router.patch('/messages/:id/read', authMiddleware, adminOnly, contactController.markAsRead);
router.patch('/messages/:id/unread', authMiddleware, adminOnly, contactController.markAsUnread);
router.delete('/messages/:id', authMiddleware, adminOnly, contactController.deleteMessage);

module.exports = router;
