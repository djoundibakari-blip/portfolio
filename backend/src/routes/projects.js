const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const { validate, projectSchema } = require('../config/validations');

// Routes publiques
router.get('/', projectController.getProjects);
router.get('/featured', projectController.getFeaturedProjects);
router.get('/category/:category', projectController.getProjectsByCategory);
router.get('/:id', projectController.getProjectById);

// Routes admin (protégées)
router.get('/all', authMiddleware, adminOnly, projectController.getAllProjects);
router.post('/', authMiddleware, adminOnly, validate(projectSchema), projectController.createProject);
router.put('/:id', authMiddleware, adminOnly, validate(projectSchema), projectController.updateProject);
router.delete('/:id', authMiddleware, adminOnly, projectController.deleteProject);

module.exports = router;
