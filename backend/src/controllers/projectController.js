const projectService = require('../services/projectService');

class ProjectController {
  // GET /api/projects - Récupérer tous les projets (publics)
  async getProjects(req, res, next) {
    try {
      const projects = await projectService.getAllProjects(true);
      
      res.json({
        success: true,
        data: projects,
        count: projects.length
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/projects/all - Récupérer tous les projets (admin seulement)
  async getAllProjects(req, res, next) {
    try {
      const projects = await projectService.getAllProjects(false);
      
      res.json({
        success: true,
        data: projects,
        count: projects.length
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/projects/:id - Récupérer un projet par ID
  async getProjectById(req, res, next) {
    try {
      const { id } = req.params;
      const isPublicOnly = req.user?.role !== 'ADMIN';
      
      const project = await projectService.getProjectById(parseInt(id), isPublicOnly);
      
      res.json({
        success: true,
        data: project
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/projects - Créer un projet (admin seulement)
  async createProject(req, res, next) {
    try {
      const project = await projectService.createProject(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Projet créé avec succès',
        data: project
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/projects/:id - Mettre à jour un projet (admin seulement)
  async updateProject(req, res, next) {
    try {
      const { id } = req.params;
      const project = await projectService.updateProject(parseInt(id), req.body);
      
      res.json({
        success: true,
        message: 'Projet mis à jour avec succès',
        data: project
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/projects/:id - Supprimer un projet (admin seulement)
  async deleteProject(req, res, next) {
    try {
      const { id } = req.params;
      const result = await projectService.deleteProject(parseInt(id));
      
      res.json({
        success: true,
        ...result
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/projects/featured - Récupérer les projets featured
  async getFeaturedProjects(req, res, next) {
    try {
      const projects = await projectService.getFeaturedProjects();
      
      res.json({
        success: true,
        data: projects,
        count: projects.length
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/projects/category/:category - Récupérer les projets par catégorie
  async getProjectsByCategory(req, res, next) {
    try {
      const { category } = req.params;
      const projects = await projectService.getProjectsByCategory(category);
      
      res.json({
        success: true,
        data: projects,
        count: projects.length,
        category
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProjectController();
