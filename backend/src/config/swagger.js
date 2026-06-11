const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio RNCP API',
      version: '1.0.0',
      description: 'API pour le portfolio hybride (apprentissage + présentation) avec gestion des compétences RNCP',
      contact: {
        name: 'Djoundi Bakari',
        email: 'djoundi.bakari@outlook.fr'
      }
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://your-api-domain.com' 
          : `http://localhost:${process.env.PORT || 3001}`,
        description: process.env.NODE_ENV === 'production' ? 'Serveur de production' : 'Serveur de développement'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID de l\'utilisateur' },
            email: { type: 'string', format: 'email', description: 'Email de l\'utilisateur' },
            firstName: { type: 'string', description: 'Prénom' },
            lastName: { type: 'string', description: 'Nom' },
            role: { type: 'string', enum: ['ADMIN', 'TEACHER'], description: 'Rôle de l\'utilisateur' },
            createdAt: { type: 'string', format: 'date-time', description: 'Date de création' }
          }
        },
        Project: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID du projet' },
            title: { type: 'string', description: 'Titre du projet' },
            description: { type: 'string', description: 'Description du projet' },
            startDate: { type: 'string', format: 'date', description: 'Date de début' },
            endDate: { type: 'string', format: 'date', description: 'Date de fin' },
            github: { type: 'string', description: 'Lien GitHub' },
            live: { type: 'string', description: 'Lien vers le site' },
            image: { type: 'string', description: 'URL de l\'image' },
            featured: { type: 'boolean', description: 'Projet mis en avant' },
            category: { type: 'string', description: 'Catégorie du projet' },
            tags: { type: 'array', items: { type: 'string' }, description: 'Tags/technologies' }
          }
        },
        Competence: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID de la compétence' },
            name: { type: 'string', description: 'Nom de la compétence' },
            description: { type: 'string', description: 'Description de la compétence' },
            blocRncp: { type: 'string', enum: ['Cadrer', 'Developper', 'Qualite'], description: 'Bloc RNCP' },
            autoEvaluationLevel: { type: 'integer', minimum: 1, maximum: 5, description: 'Niveau d\'auto-évaluation' },
            evidencesCount: { type: 'integer', description: 'Nombre de preuves associées' }
          }
        },
        ContactMessage: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID du message' },
            name: { type: 'string', description: 'Nom de l\'expéditeur' },
            email: { type: 'string', format: 'email', description: 'Email de l\'expéditeur' },
            subject: { type: 'string', description: 'Sujet du message' },
            message: { type: 'string', description: 'Contenu du message' },
            isRead: { type: 'boolean', description: 'Message lu/non lu' },
            createdAt: { type: 'string', format: 'date-time', description: 'Date d\'envoi' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', description: 'Message d\'erreur' },
            errors: { type: 'array', items: { type: 'object' }, description: 'Détails des erreurs de validation' }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', description: 'Message de succès' },
            data: { description: 'Données retournées' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const specs = swaggerJsdoc(options);

const swaggerUiOptions = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Portfolio RNCP API Documentation'
};

module.exports = { specs, swaggerUiOptions };
