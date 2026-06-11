const contactService = require('../services/contactService');

class ContactController {
  // POST /api/contact - Envoyer un message de contact
  async sendMessage(req, res, next) {
    try {
      const message = await contactService.createMessage(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Message envoyé avec succès',
        data: message
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/contact/messages - Récupérer tous les messages (admin seulement)
  async getMessages(req, res, next) {
    try {
      const { isRead } = req.query;
      const isReadFilter = isRead !== undefined ? isRead === 'true' : null;
      
      const messages = await contactService.getAllMessages(isReadFilter);
      
      res.json({
        success: true,
        data: messages,
        count: messages.length
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/contact/messages/:id - Récupérer un message par ID (admin seulement)
  async getMessageById(req, res, next) {
    try {
      const { id } = req.params;
      const message = await contactService.getMessageById(parseInt(id));
      
      res.json({
        success: true,
        data: message
      });
    } catch (error) {
      next(error);
    }
  }

  // PATCH /api/contact/messages/:id/read - Marquer un message comme lu (admin seulement)
  async markAsRead(req, res, next) {
    try {
      const { id } = req.params;
      const result = await contactService.markAsRead(parseInt(id));
      
      res.json({
        success: true,
        ...result
      });
    } catch (error) {
      next(error);
    }
  }

  // PATCH /api/contact/messages/:id/unread - Marquer un message comme non lu (admin seulement)
  async markAsUnread(req, res, next) {
    try {
      const { id } = req.params;
      const result = await contactService.markAsUnread(parseInt(id));
      
      res.json({
        success: true,
        ...result
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/contact/messages/:id - Supprimer un message (admin seulement)
  async deleteMessage(req, res, next) {
    try {
      const { id } = req.params;
      const result = await contactService.deleteMessage(parseInt(id));
      
      res.json({
        success: true,
        ...result
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/contact/statistics - Statistiques des messages (admin seulement)
  async getContactStatistics(req, res, next) {
    try {
      const stats = await contactService.getStatistics();
      const unreadCount = await contactService.getUnreadCount();
      
      res.json({
        success: true,
        data: {
          ...stats,
          unreadCount
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/contact/unread-count - Nombre de messages non lus (admin seulement)
  async getUnreadCount(req, res, next) {
    try {
      const count = await contactService.getUnreadCount();
      
      res.json({
        success: true,
        data: { unreadCount: count }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ContactController();
