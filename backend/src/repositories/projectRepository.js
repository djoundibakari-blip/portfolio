const { prisma } = require('../config/database');

class ProjectRepository {
  async findAll(isPublicOnly = true) {
    const where = isPublicOnly ? { isPublic: true } : {};
    
    return await prisma.project.findMany({
      where,
      include: {
        tags: {
          include: {
            tag: true
          }
        },
        evidences: {
          include: {
            competence: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findById(id, isPublicOnly = true) {
    const where = { id };
    if (isPublicOnly) {
      where.isPublic = true;
    }

    return await prisma.project.findFirst({
      where,
      include: {
        tags: {
          include: {
            tag: true
          }
        },
        evidences: {
          include: {
            competence: true
          }
        }
      }
    });
  }

  async create(data) {
    const { tags, ...projectData } = data;
    
    const project = await prisma.project.create({
      data: projectData,
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    });

    // Ajouter les tags si fournis
    if (tags && tags.length > 0) {
      await this.addTagsToProject(project.id, tags);
    }

    return this.findById(project.id, false);
  }

  async update(id, data) {
    const { tags, ...projectData } = data;
    
    const project = await prisma.project.update({
      where: { id },
      data: projectData,
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    });

    // Mettre à jour les tags si fournis
    if (tags !== undefined) {
      await this.updateProjectTags(id, tags);
    }

    return this.findById(id, false);
  }

  async delete(id) {
    return await prisma.project.delete({
      where: { id }
    });
  }

  async getFeatured() {
    return await prisma.project.findMany({
      where: { 
        isPublic: true,
        isFeatured: true 
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async getByCategory(category) {
    return await prisma.project.findMany({
      where: { 
        category,
        isPublic: true 
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  // Méthodes pour gérer les tags
  async addTagsToProject(projectId, tagNames) {
    const tags = await Promise.all(
      tagNames.map(async (tagName) => {
        return await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName }
        });
      })
    );

    await Promise.all(
      tags.map(tag =>
        prisma.projectTag.upsert({
          where: {
            projectId_tagId: {
              projectId,
              tagId: tag.id
            }
          },
          update: {},
          create: {
            projectId,
            tagId: tag.id
          }
        })
      )
    );
  }

  async updateProjectTags(projectId, tagNames) {
    // Supprimer les tags existants
    await prisma.projectTag.deleteMany({
      where: { projectId }
    });

    // Ajouter les nouveaux tags
    if (tagNames.length > 0) {
      await this.addTagsToProject(projectId, tagNames);
    }
  }
}

module.exports = new ProjectRepository();
