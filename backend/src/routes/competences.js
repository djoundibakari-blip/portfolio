const express = require('express');
const router = express.Router();
const competenceController = require('../controllers/competenceController');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const { validate, competenceSchema } = require('../config/validations');

// Routes publiques
router.get('/', competenceController.getCompetences);
router.get('/bloc/:bloc', competenceController.getCompetencesByBloc);
router.get('/:id', competenceController.getCompetenceById);

// Routes admin (protégées)
router.get('/admin/all', authMiddleware, adminOnly, competenceController.getAllCompetences);
router.get('/admin/statistics', authMiddleware, adminOnly, competenceController.getCompetenceStatistics);
router.post('/', authMiddleware, adminOnly, validate(competenceSchema), competenceController.createCompetence);
router.put('/:id', authMiddleware, adminOnly, validate(competenceSchema), competenceController.updateCompetence);
router.delete('/:id', authMiddleware, adminOnly, competenceController.deleteCompetence);

module.exports = router;
