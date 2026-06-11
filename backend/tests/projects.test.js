const request = require('supertest');
const app = require('../src/server');
const { prisma } = require('../src/config/database');

describe('Projects API', () => {
  let authToken;
  let testProjectId;

  beforeAll(async () => {
    // Créer un utilisateur de test pour l'authentification
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        role: 'ADMIN'
      });

    authToken = registerResponse.body.data.token;
  });

  afterAll(async () => {
    // Nettoyer les données de test
    await prisma.projectTag.deleteMany();
    await prisma.project.deleteMany({
      where: { title: { contains: 'Test Project' } }
    });
    await prisma.user.deleteMany({
      where: { email: 'test@example.com' }
    });
    await prisma.$disconnect();
  });

  describe('GET /api/projects', () => {
    it('should return public projects', async () => {
      const response = await request(app)
        .get('/api/projects')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('POST /api/projects', () => {
    it('should create a new project when authenticated', async () => {
      const projectData = {
        title: 'Test Project',
        description: 'This is a test project',
        github: 'https://github.com/test/project',
        category: 'Test Category',
        tags: ['JavaScript', 'Node.js'],
        isPublic: true,
        featured: false
      };

      const response = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send(projectData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(projectData.title);
      testProjectId = response.body.data.id;
    });

    it('should return 401 when not authenticated', async () => {
      const projectData = {
        title: 'Unauthorized Project',
        description: 'This should fail'
      };

      await request(app)
        .post('/api/projects')
        .send(projectData)
        .expect(401);
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = {
        title: '', // Titre vide
        description: 'Missing title'
      };

      await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidData)
        .expect(400);
    });
  });

  describe('GET /api/projects/:id', () => {
    it('should return a specific project', async () => {
      const response = await request(app)
        .get(`/api/projects/${testProjectId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(testProjectId);
    });

    it('should return 404 for non-existent project', async () => {
      await request(app)
        .get('/api/projects/99999')
        .expect(404);
    });
  });

  describe('PUT /api/projects/:id', () => {
    it('should update a project when authenticated', async () => {
      const updateData = {
        title: 'Updated Test Project',
        description: 'This project has been updated'
      };

      const response = await request(app)
        .put(`/api/projects/${testProjectId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(updateData.title);
    });
  });

  describe('GET /api/projects/featured', () => {
    it('should return featured projects', async () => {
      const response = await request(app)
        .get('/api/projects/featured')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('DELETE /api/projects/:id', () => {
    it('should delete a project when authenticated', async () => {
      await request(app)
        .delete(`/api/projects/${testProjectId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // Vérifier que le projet n'existe plus
      await request(app)
        .get(`/api/projects/${testProjectId}`)
        .expect(404);
    });
  });
});
