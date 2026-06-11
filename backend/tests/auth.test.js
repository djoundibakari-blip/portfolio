const request = require('supertest');
const app = require('../src/server');
const { prisma } = require('../src/config/database');

describe('Auth API', () => {
  const testUser = {
    email: 'auth.test@example.com',
    password: 'password123',
    firstName: 'Auth',
    lastName: 'Test'
  };

  let authToken;

  afterAll(async () => {
    // Nettoyer les données de test
    await prisma.user.deleteMany({
      where: { email: testUser.email }
    });
    await prisma.$disconnect();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(testUser.email);
      expect(response.body.data.token).toBeDefined();
      authToken = response.body.data.token;
    });

    it('should return 400 for duplicate email', async () => {
      await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(400);
    });

    it('should return 400 for invalid email', async () => {
      const invalidUser = {
        email: 'invalid-email',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      };

      await request(app)
        .post('/api/auth/register')
        .send(invalidUser)
        .expect(400);
    });

    it('should return 400 for short password', async () => {
      const invalidUser = {
        email: 'test2@example.com',
        password: '123', // Too short
        firstName: 'Test',
        lastName: 'User'
      };

      await request(app)
        .post('/api/auth/register')
        .send(invalidUser)
        .expect(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(testUser.email);
      expect(response.body.data.token).toBeDefined();
    });

    it('should return 401 for invalid email', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrong@example.com',
          password: testUser.password
        })
        .expect(401);
    });

    it('should return 401 for invalid password', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        })
        .expect(401);
    });

    it('should return 400 for missing fields', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email
          // Missing password
        })
        .expect(400);
    });
  });

  describe('GET /api/auth/profile', () => {
    it('should return user profile when authenticated', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe(testUser.email);
      expect(response.body.data.passwordHash).toBeUndefined(); // Password should not be returned
    });

    it('should return 401 when not authenticated', async () => {
      await request(app)
        .get('/api/auth/profile')
        .expect(401);
    });

    it('should return 401 for invalid token', async () => {
      await request(app)
        .get('/api/auth/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });

  describe('PUT /api/auth/profile', () => {
    it('should update user profile when authenticated', async () => {
      const updateData = {
        firstName: 'Updated',
        lastName: 'Name'
      };

      const response = await request(app)
        .put('/api/auth/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.firstName).toBe(updateData.firstName);
      expect(response.body.data.lastName).toBe(updateData.lastName);
    });
  });

  describe('POST /api/auth/verify-token', () => {
    it('should verify valid token', async () => {
      const response = await request(app)
        .post('/api/auth/verify-token')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(testUser.email);
    });

    it('should return 401 for invalid token', async () => {
      await request(app)
        .post('/api/auth/verify-token')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });
});
