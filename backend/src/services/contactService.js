const contactRepository = require('../repositories/contactRepository');
const { logger } = require('../utils/logger');

class ContactService {
  async createMessage(messageData) {
    try {
      const message = await contactRepository.create(messageData);
      
      logger.info(`Nouveau message de contact de ${messageData.email}: ${messageData.subject}`);
      
      return {
        id: message.id,
        name: message.name,
        email: message.email,
        subject: message.subject,
        message: message.message,
        isRead: message.isRead,
        createdAt: message.createdAt
      };
    } catch (error) {
      logger.error('Erreur dans createMessage:', error);
      throw error;
    }
  }

  async getAllMessages(isRead = null) {
    try {
      const messages = await contactRepository.findAll(isRead);
      
      return messages.map(message => ({
        id: message.id,
        name: message.name,
        email: message.email,
        subject: message.subject,
        message: message.message,
        isRead: message.isRead,
        createdAt: message.createdAt
      }));
    } catch (error) {
      logger.error('Erreur dans getAllMessages:', error);
      throw error;
    }
  }

  async getMessageById(id) {
    try {
      const message = await contactRepository.findById(id);
      
      if (!message) {
        throw new Error('Message non trouvé');
      }

      return {
        id: message.id,
        name: message.name,
        email: message.email,
        subject: message.subject,
        message: message.message,
        isRead: message.isRead,
        createdAt: message.createdAt
      };
    } catch (error) {
      logger.error('Erreur dans getMessageById:', error);
      throw error;
    }
  }

  async markAsRead(id) {
    try {
      const message = await contactRepository.findById(id);
      if (!message) {
        throw new Error('Message non trouvé');
      }

      await contactRepository.markAsRead(id);
      return { message: 'Message marqué comme lu' };
    } catch (error) {
      logger.error('Erreur dans markAsRead:', error);
      throw error;
    }
  }

  async markAsUnread(id) {
    try {
      const message = await contactRepository.findById(id);
      if (!message) {
        throw new Error('Message non trouvé');
      }

      await contactRepository.markAsUnread(id);
      return { message: 'Message marqué comme non lu' };
    } catch (error) {
      logger.error('Erreur dans markAsUnread:', error);
      throw error;
    }
  }

  async deleteMessage(id) {
    try {
      const message = await contactRepository.findById(id);
      if (!message) {
        throw new Error('Message non trouvé');
      }

      await contactRepository.delete(id);
      return { message: 'Message supprimé avec succès' };
    } catch (error) {
      logger.error('Erreur dans deleteMessage:', error);
      throw error;
    }
  }

  async getUnreadCount() {
    try {
      return await contactRepository.getUnreadCount();
    } catch (error) {
      logger.error('Erreur dans getUnreadCount:', error);
      throw error;
    }
  }

  async getStatistics() {
    try {
      return await contactRepository.getStatistics();
    } catch (error) {
      logger.error('Erreur dans getStatistics:', error);
      throw error;
    }
  }
}

module.exports = new ContactService();
