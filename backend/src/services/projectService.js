const projectRepository = require('../repositories/projectRepository');
const { logger } = require('../utils/logger');

class ProjectService {
  async getAllProjects(isPublicOnly = true) {
    try {
      const projects = await projectRepository.findAll(isPublicOnly);
      
      // Transformer les données pour le format attendu par le frontend
      return projects.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
        github: project.githubLink,
        live: project.liveLink,
        image: project.imageUrl,
        featured: project.isFeatured,
        category: project.category,
        tags: project.tags.map(pt => pt.tag.name),
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
      }));
    } catch (error) {
      logger.error('Erreur dans getAllProjects:', error);
      throw error;
    }
  }

  async getProjectById(id, isPublicOnly = true) {
    try {
      const project = await projectRepository.findById(id, isPublicOnly);
      
      if (!project) {
        throw new Error('Projet non trouvé');
      }

      return {
        id: project.id,
        title: project.title,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
        github: project.githubLink,
        live: project.liveLink,
        image: project.imageUrl,
        featured: project.isFeatured,
        category: project.category,
        isPublic: project.isPublic,
        tags: project.tags.map(pt => pt.tag.name),
        evidences: project.evidences.map(evidence => ({
          id: evidence.id,
          competence: evidence.competence,
          description: evidence.description,
          proofLevel: evidence.proofLevel
        })),
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
      };
    } catch (error) {
      logger.error('Erreur dans getProjectById:', error);
      throw error;
    }
  }

  async createProject(projectData) {
    try {
      // Transformer les données pour la base de données
      const dbData = {
        title: projectData.title,
        description: projectData.description,
        startDate: projectData.startDate ? new Date(projectData.startDate) : null,
        endDate: projectData.endDate ? new Date(projectData.endDate) : null,
        githubLink: projectData.github || null,
        liveLink: projectData.live || null,
        imageUrl: projectData.image || null,
        isPublic: projectData.isPublic ?? true,
        isFeatured: projectData.featured ?? false,
        category: projectData.category || null,
        tags: projectData.tags || []
      };

      const project = await projectRepository.create(dbData);
      return await this.getProjectById(project.id, false);
    } catch (error) {
      logger.error('Erreur dans createProject:', error);
      throw error;
    }
  }

  async updateProject(id, projectData) {
    try {
      // Vérifier si le projet existe
      const existingProject = await projectRepository.findById(id, false);
      if (!existingProject) {
        throw new Error('Projet non trouvé');
      }

      // Transformer les données
      const dbData = {};
      
      if (projectData.title !== undefined) dbData.title = projectData.title;
      if (projectData.description !== undefined) dbData.description = projectData.description;
      if (projectData.startDate !== undefined) dbData.startDate = projectData.startDate ? new Date(projectData.startDate) : null;
      if (projectData.endDate !== undefined) dbData.endDate = projectData.endDate ? new Date(projectData.endDate) : null;
      if (projectData.github !== undefined) dbData.githubLink = projectData.github;
      if (projectData.live !== undefined) dbData.liveLink = projectData.live;
      if (projectData.image !== undefined) dbData.imageUrl = projectData.image;
      if (projectData.isPublic !== undefined) dbData.isPublic = projectData.isPublic;
      if (projectData.featured !== undefined) dbData.isFeatured = projectData.featured;
      if (projectData.category !== undefined) dbData.category = projectData.category;
      if (projectData.tags !== undefined) dbData.tags = projectData.tags;

      const project = await projectRepository.update(id, dbData);
      return await this.getProjectById(project.id, false);
    } catch (error) {
      logger.error('Erreur dans updateProject:', error);
      throw error;
    }
  }

  async deleteProject(id) {
    try {
      const existingProject = await projectRepository.findById(id, false);
      if (!existingProject) {
        throw new Error('Projet non trouvé');
      }

      await projectRepository.delete(id);
      return { message: 'Projet supprimé avec succès' };
    } catch (error) {
      logger.error('Erreur dans deleteProject:', error);
      throw error;
    }
  }

  async getFeaturedProjects() {
    try {
      const projects = await projectRepository.getFeatured();
      
      return projects.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        github: project.githubLink,
        live: project.liveLink,
        image: project.imageUrl,
        category: project.category,
        tags: project.tags.map(pt => pt.tag.name),
        featured: project.isFeatured
      }));
    } catch (error) {
      logger.error('Erreur dans getFeaturedProjects:', error);
      throw error;
    }
  }

  async getProjectsByCategory(category) {
    try {
      const projects = await projectRepository.getByCategory(category);
      
      return projects.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        github: project.githubLink,
        live: project.liveLink,
        image: project.imageUrl,
        category: project.category,
        tags: project.tags.map(pt => pt.tag.name),
        featured: project.isFeatured
      }));
    } catch (error) {
      logger.error('Erreur dans getProjectsByCategory:', error);
      throw error;
    }
  }
}

module.exports = new ProjectService();
