const competenceRepository = require('../repositories/competenceRepository');
const { logger } = require('../utils/logger');

class CompetenceService {
  async getAllCompetences() {
    try {
      const competences = await competenceRepository.findAll();
      
      // Grouper par bloc RNCP
      const groupedCompetences = {
        Cadrer: [],
        Developper: [],
        Qualite: []
      };

      competences.forEach(competence => {
        groupedCompetences[competence.blocRncp].push({
          id: competence.id,
          name: competence.name,
          description: competence.description,
          blocRncp: competence.blocRncp,
          autoEvaluationLevel: competence.autoEvaluationLevel,
          evidencesCount: competence.evidences.length,
          evidences: competence.evidences.map(evidence => ({
            id: evidence.id,
            project: {
              id: evidence.project.id,
              title: evidence.project.title,
              description: evidence.project.description
            },
            description: evidence.description,
            proofLevel: evidence.proofLevel
          }))
        });
      });

      return groupedCompetences;
    } catch (error) {
      logger.error('Erreur dans getAllCompetences:', error);
      throw error;
    }
  }

  async getCompetenceById(id) {
    try {
      const competence = await competenceRepository.findById(id);
      
      if (!competence) {
        throw new Error('Compétence non trouvée');
      }

      return {
        id: competence.id,
        name: competence.name,
        description: competence.description,
        blocRncp: competence.blocRncp,
        autoEvaluationLevel: competence.autoEvaluationLevel,
        evidences: competence.evidences.map(evidence => ({
          id: evidence.id,
          project: {
            id: evidence.project.id,
            title: evidence.project.title,
            description: evidence.project.description,
            githubLink: evidence.project.githubLink,
            liveLink: evidence.project.liveLink,
            category: evidence.project.category,
            tags: evidence.project.tags?.map(pt => pt.tag.name) || []
          },
          description: evidence.description,
          proofLevel: evidence.proofLevel,
          createdAt: evidence.createdAt
        })),
        createdAt: competence.createdAt,
        updatedAt: competence.updatedAt
      };
    } catch (error) {
      logger.error('Erreur dans getCompetenceById:', error);
      throw error;
    }
  }

  async getCompetencesByBloc(blocRncp) {
    try {
      const competences = await competenceRepository.findByBloc(blocRncp);
      
      return competences.map(competence => ({
        id: competence.id,
        name: competence.name,
        description: competence.description,
        blocRncp: competence.blocRncp,
        autoEvaluationLevel: competence.autoEvaluationLevel,
        evidencesCount: competence.evidences.length,
        evidences: competence.evidences.map(evidence => ({
          id: evidence.id,
          project: {
            id: evidence.project.id,
            title: evidence.project.title,
            description: evidence.project.description
          },
          description: evidence.description,
          proofLevel: evidence.proofLevel
        }))
      }));
    } catch (error) {
      logger.error('Erreur dans getCompetencesByBloc:', error);
      throw error;
    }
  }

  async createCompetence(competenceData) {
    try {
      const competence = await competenceRepository.create(competenceData);
      return await this.getCompetenceById(competence.id);
    } catch (error) {
      logger.error('Erreur dans createCompetence:', error);
      throw error;
    }
  }

  async updateCompetence(id, competenceData) {
    try {
      const existingCompetence = await competenceRepository.findById(id);
      if (!existingCompetence) {
        throw new Error('Compétence non trouvée');
      }

      await competenceRepository.update(id, competenceData);
      return await this.getCompetenceById(id);
    } catch (error) {
      logger.error('Erreur dans updateCompetence:', error);
      throw error;
    }
  }

  async deleteCompetence(id) {
    try {
      const existingCompetence = await competenceRepository.findById(id);
      if (!existingCompetence) {
        throw new Error('Compétence non trouvée');
      }

      await competenceRepository.delete(id);
      return { message: 'Compétence supprimée avec succès' };
    } catch (error) {
      logger.error('Erreur dans deleteCompetence:', error);
      throw error;
    }
  }

  async getCompetencesWithProjects() {
    try {
      const competences = await competenceRepository.getWithProjects();
      
      // Grouper par bloc RNCP pour le frontend
      const groupedCompetences = {
        Cadrer: [],
        Developper: [],
        Qualite: []
      };

      competences.forEach(competence => {
        // Filtrer les projets publics seulement
        const publicEvidences = competence.evidences.filter(evidence => 
          evidence.project.isPublic
        );

        groupedCompetences[competence.blocRncp].push({
          id: competence.id,
          name: competence.name,
          description: competence.description,
          blocRncp: competence.blocRncp,
          autoEvaluationLevel: competence.autoEvaluationLevel,
          evidencesCount: publicEvidences.length,
          evidences: publicEvidences.map(evidence => ({
            id: evidence.id,
            project: {
              id: evidence.project.id,
              title: evidence.project.title,
              description: evidence.project.description,
              githubLink: evidence.project.githubLink,
              liveLink: evidence.project.liveLink,
              category: evidence.project.category,
              tags: evidence.project.tags?.map(pt => pt.tag.name) || []
            },
            description: evidence.description,
            proofLevel: evidence.proofLevel
          }))
        });
      });

      return groupedCompetences;
    } catch (error) {
      logger.error('Erreur dans getCompetencesWithProjects:', error);
      throw error;
    }
  }

  async getStatistics() {
    try {
      const stats = await competenceRepository.getStatistics();
      
      return {
        total: stats.reduce((sum, stat) => sum + stat.count, 0),
        byBloc: stats.reduce((acc, stat) => {
          acc[stat.bloc] = stat.count;
          return acc;
        }, {})
      };
    } catch (error) {
      logger.error('Erreur dans getStatistics:', error);
      throw error;
    }
  }
}

module.exports = new CompetenceService();
