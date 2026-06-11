const { prisma } = require('../config/database');

class ContactRepository {
  async create(data) {
    return await prisma.contactMessage.create({
      data
    });
  }

  async findAll(isRead = null) {
    const where = isRead !== null ? { isRead } : {};
    
    return await prisma.contactMessage.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findById(id) {
    return await prisma.contactMessage.findUnique({
      where: { id }
    });
  }

  async markAsRead(id) {
    return await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true }
    });
  }

  async markAsUnread(id) {
    return await prisma.contactMessage.update({
      where: { id },
      data: { isRead: false }
    });
  }

  async delete(id) {
    return await prisma.contactMessage.delete({
      where: { id }
    });
  }

  async getUnreadCount() {
    return await prisma.contactMessage.count({
      where: { isRead: false }
    });
  }

  async getStatistics() {
    const total = await prisma.contactMessage.count();
    const unread = await prisma.contactMessage.count({
      where: { isRead: false }
    });
    const read = total - unread;

    return {
      total,
      read,
      unread
    };
  }
}

module.exports = new ContactRepository();
