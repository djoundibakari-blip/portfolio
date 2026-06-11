require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// Import des configurations et middleware
const { connectDB } = require('./config/database');
const { logger, httpLogger } = require('./utils/logger');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { specs, swaggerUiOptions } = require('./config/swagger');
const swaggerUi = require('swagger-ui-express');

// Import des routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const competenceRoutes = require('./routes/competences');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3001;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre
  message: {
    success: false,
    message: 'Trop de requêtes, veuillez réessayer plus tard'
  }
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(limiter);
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(httpLogger);

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/competences', competenceRoutes);
app.use('/api/contact', contactRoutes);

// Route de santé
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Serveur en ligne',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Route racine
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API Portfolio RNCP',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      auth: '/api/auth',
      projects: '/api/projects',
      competences: '/api/competences',
      contact: '/api/contact'
    }
  });
});

// Middleware pour les routes non trouvées
app.use(notFound);

// Middleware de gestion des erreurs
app.use(errorHandler);

// Démarrage du serveur
const startServer = async () => {
  try {
    // Connexion à la base de données (avec fallback)
    try {
      await connectDB();
    } catch (dbError) {
      logger.warn('⚠️ Base de données non disponible, démarrage en mode dégradé');
      logger.warn('Configurez MySQL et mettez à jour .env pour activer toutes les fonctionnalités');
    }
    
    // Démarrage du serveur
    app.listen(PORT, () => {
      logger.info(`🚀 Serveur démarré sur le port ${PORT}`);
      logger.info(`📚 Documentation: http://localhost:${PORT}/api-docs`);
      logger.info(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`🔗 API Base URL: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    logger.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM reçu, arrêt du serveur...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT reçu, arrêt du serveur...');
  process.exit(0);
});

startServer();

module.exports = app;
