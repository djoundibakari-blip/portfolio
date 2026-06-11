const { PrismaClient } = require('@prisma/client');
const { logger } = require('../utils/logger');

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

// Log des requêtes en développement
prisma.$on('query', (e) => {
  if (process.env.NODE_ENV === 'development') {
    logger.info(`Query: ${e.query}`);
    logger.info(`Params: ${e.params}`);
    logger.info(`Duration: ${e.duration}ms`);
  }
});

// Gestion des erreurs de connexion
prisma.$on('error', (e) => {
  logger.error('Database error:', e);
});

// Test de connexion
const connectDB = async () => {
  try {
    await prisma.$connect();
    logger.info('✅ Database connected successfully');
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    throw error; // Lancer l'erreur pour être gérée par le serveur
  }
};

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
  logger.info('Database disconnected');
});

module.exports = { prisma, connectDB };
