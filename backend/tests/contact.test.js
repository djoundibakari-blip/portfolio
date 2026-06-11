const request = require('supertest');
const app = require('../src/server');
const { prisma } = require('../src/config/database');

describe('Contact API', () => {
  let authToken;
  let testMessageId;

  beforeAll(async () => {
    // Créer un utilisateur admin pour les tests
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'admin.test@example.com',
        password: 'password123',
        firstName: 'Admin',
        lastName: 'Test',
        role: 'ADMIN'
      });

    authToken = registerResponse.body.data.token;
  });

  afterAll(async () => {
    // Nettoyer les données de test
    await prisma.contactMessage.deleteMany({
      where: { email: 'contact.test@example.com' }
    });
    await prisma.user.deleteMany({
      where: { email: 'admin.test@example.com' }
    });
    await prisma.$disconnect();
  });

  describe('POST /api/contact', () => {
    it('should create a new contact message', async () => {
      const messageData = {
        name: 'Test Contact',
        email: 'contact.test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message for the contact form. It should be at least 10 characters long.'
      };

      const response = await request(app)
        .post('/api/contact')
        .send(messageData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(messageData.name);
      expect(response.body.data.email).toBe(messageData.email);
      expect(response.body.data.isRead).toBe(false);
      testMessageId = response.body.data.id;
    });

    it('should return 400 for missing fields', async () => {
      const invalidData = {
        name: 'Test Contact',
        // Missing email, subject, message
      };

      await request(app)
        .post('/api/contact')
        .send(invalidData)
        .expect(400);
    });

    it('should return 400 for invalid email', async () => {
      const invalidData = {
        name: 'Test Contact',
        email: 'invalid-email',
        subject: 'Test Subject',
        message: 'Test message'
      };

      await request(app)
        .post('/api/contact')
        .send(invalidData)
        .expect(400);
    });

    it('should return 400 for short message', async () => {
      const invalidData = {
        name: 'Test Contact',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Short' // Less than 10 characters
      };

      await request(app)
        .post('/api/contact')
        .send(invalidData)
        .expect(400);
    });
  });

  describe('GET /api/contact/messages', () => {
    it('should return all messages when authenticated as admin', async () => {
      const response = await request(app)
        .get('/api/contact/messages')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should return 401 when not authenticated', async () => {
      await request(app)
        .get('/api/contact/messages')
        .expect(401);
    });
  });

  describe('GET /api/contact/messages/:id', () => {
    it('should return a specific message when authenticated', async () => {
      const response = await request(app)
        .get(`/api/contact/messages/${testMessageId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(testMessageId);
    });

    it('should return 404 for non-existent message', async () => {
      await request(app)
        .get('/api/contact/messages/99999')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });

  describe('PATCH /api/contact/messages/:id/read', () => {
    it('should mark message as read when authenticated', async () => {
      const response = await request(app)
        .patch(`/api/contact/messages/${testMessageId}/read`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Message marqué comme lu');

      // Verify the message is marked as read
      const getMessageResponse = await request(app)
        .get(`/api/contact/messages/${testMessageId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(getMessageResponse.body.data.isRead).toBe(true);
    });

    it('should return 401 when not authenticated', async () => {
      await request(app)
        .patch(`/api/contact/messages/${testMessageId}/read`)
        .expect(401);
    });
  });

  describe('PATCH /api/contact/messages/:id/unread', () => {
    it('should mark message as unread when authenticated', async () => {
      const response = await request(app)
        .patch(`/api/contact/messages/${testMessageId}/unread`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Message marqué comme non lu');
    });
  });

  describe('GET /api/contact/statistics', () => {
    it('should return contact statistics when authenticated', async () => {
      const response = await request(app)
        .get('/api/contact/statistics')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('total');
      expect(response.body.data).toHaveProperty('read');
      expect(response.body.data).toHaveProperty('unread');
      expect(response.body.data).toHaveProperty('unreadCount');
      expect(typeof response.body.data.total).toBe('number');
    });
  });

  describe('GET /api/contact/unread-count', () => {
    it('should return unread count when authenticated', async () => {
      const response = await request(app)
        .get('/api/contact/unread-count')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('unreadCount');
      expect(typeof response.body.data.unreadCount).toBe('number');
    });
  });

  describe('DELETE /api/contact/messages/:id', () => {
    it('should delete message when authenticated', async () => {
      await request(app)
        .delete(`/api/contact/messages/${testMessageId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // Verify the message is deleted
      await request(app)
        .get(`/api/contact/messages/${testMessageId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });

    it('should return 401 when not authenticated', async () => {
      await request(app)
        .delete('/api/contact/messages/99999')
        .expect(401);
    });
  });
});
