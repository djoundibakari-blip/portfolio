const competenceService = require('../services/competenceService');

class CompetenceController {
  // GET /api/competences - Récupérer toutes les compétences (publiques)
  async getCompetences(req, res, next) {
    try {
      const competences = await competenceService.getCompetencesWithProjects();
      
      res.json({
        success: true,
        data: competences
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/competences/admin - Récupérer toutes les compétences (admin)
  async getAllCompetences(req, res, next) {
    try {
      const competences = await competenceService.getAllCompetences();
      
      res.json({
        success: true,
        data: competences
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/competences/:id - Récupérer une compétence par ID
  async getCompetenceById(req, res, next) {
    try {
      const { id } = req.params;
      const competence = await competenceService.getCompetenceById(parseInt(id));
      
      res.json({
        success: true,
        data: competence
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/competences/bloc/:bloc - Récupérer les compétences par bloc RNCP
  async getCompetencesByBloc(req, res, next) {
    try {
      const { bloc } = req.params;
      const competences = await competenceService.getCompetencesByBloc(bloc);
      
      res.json({
        success: true,
        data: competences,
        bloc,
        count: competences.length
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/competences - Créer une compétence (admin seulement)
  async createCompetence(req, res, next) {
    try {
      const competence = await competenceService.createCompetence(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Compétence créée avec succès',
        data: competence
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/competences/:id - Mettre à jour une compétence (admin seulement)
  async updateCompetence(req, res, next) {
    try {
      const { id } = req.params;
      const competence = await competenceService.updateCompetence(parseInt(id), req.body);
      
      res.json({
        success: true,
        message: 'Compétence mise à jour avec succès',
        data: competence
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/competences/:id - Supprimer une compétence (admin seulement)
  async deleteCompetence(req, res, next) {
    try {
      const { id } = req.params;
      const result = await competenceService.deleteCompetence(parseInt(id));
      
      res.json({
        success: true,
        ...result
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/competences/statistics - Statistiques des compétences (admin)
  async getCompetenceStatistics(req, res, next) {
    try {
      const stats = await competenceService.getStatistics();
      
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CompetenceController();
