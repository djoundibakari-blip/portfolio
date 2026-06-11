const { prisma } = require('../config/database');

class CompetenceRepository {
  async findAll() {
    return await prisma.competence.findMany({
      include: {
        evidences: {
          include: {
            project: true
          }
        }
      },
      orderBy: [
        { blocRncp: 'asc' },
        { name: 'asc' }
      ]
    });
  }

  async findById(id) {
    return await prisma.competence.findUnique({
      where: { id },
      include: {
        evidences: {
          include: {
            project: {
              include: {
                tags: {
                  include: {
                    tag: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  async findByBloc(blocRncp) {
    return await prisma.competence.findMany({
      where: { blocRncp },
      include: {
        evidences: {
          include: {
            project: true
          }
        }
      },
      orderBy: { name: 'asc' }
    });
  }

  async create(data) {
    return await prisma.competence.create({
      data,
      include: {
        evidences: true
      }
    });
  }

  async update(id, data) {
    return await prisma.competence.update({
      where: { id },
      data,
      include: {
        evidences: {
          include: {
            project: true
          }
        }
      }
    });
  }

  async delete(id) {
    return await prisma.competence.delete({
      where: { id }
    });
  }

  async getStatistics() {
    const stats = await prisma.competence.groupBy({
      by: ['blocRncp'],
      _count: {
        id: true
      }
    });

    return stats.map(stat => ({
      bloc: stat.blocRncp,
      count: stat._count.id
    }));
  }

  async getWithProjects() {
    return await prisma.competence.findMany({
      include: {
        evidences: {
          include: {
            project: {
              where: { isPublic: true },
              include: {
                tags: {
                  include: {
                    tag: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: [
        { blocRncp: 'asc' },
        { name: 'asc' }
      ]
    });
  }
}

module.exports = new CompetenceRepository();
