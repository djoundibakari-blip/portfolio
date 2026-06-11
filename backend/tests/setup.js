// Configuration pour les tests
require('dotenv').config({ path: '.env.test' });

// Configuration de la base de données pour les tests
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'mysql://root:password@localhost:3306/portfolio_rncp_test';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-only';

// Timeout pour les tests asynchrones
jest.setTimeout(30000);

// Hooks globaux avant et après les tests
beforeAll(async () => {
  // S'assurer que la base de données de test est propre
  console.log('🧪 Starting test suite...');
});

afterAll(async () => {
  // Nettoyage global après tous les tests
  console.log('✅ Test suite completed');
});

// Hooks pour chaque test
beforeEach(() => {
  // Nettoyage avant chaque test si nécessaire
});

afterEach(() => {
  // Nettoyage après chaque test si nécessaire
});

// Exporter des utilitaires de test
module.exports = {
  // Créer un utilisateur de test
  createTestUser: async (userData = {}) => {
    const defaultUser = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      role: 'ADMIN',
      ...userData
    };
    
    const response = await request(app)
      .post('/api/auth/register')
      .send(defaultUser);
    
    return response.body.data;
  },

  // Créer un projet de test
  createTestProject: async (projectData = {}, authToken) => {
    const defaultProject = {
      title: 'Test Project',
      description: 'This is a test project',
      category: 'Test Category',
      tags: ['JavaScript'],
      isPublic: true,
      ...projectData
    };
    
    const response = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${authToken}`)
      .send(defaultProject);
    
    return response.body.data;
  },

  // Créer un message de contact de test
  createTestMessage: async (messageData = {}) => {
    const defaultMessage = {
      name: 'Test Contact',
      email: 'test.contact@example.com',
      subject: 'Test Subject',
      message: 'This is a test message that is long enough to pass validation',
      ...messageData
    };
    
    const response = await request(app)
      .post('/api/contact')
      .send(defaultMessage);
    
    return response.body.data;
  }
};
