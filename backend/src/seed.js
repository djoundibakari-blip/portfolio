require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // Créer un utilisateur admin par défaut
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@portfolio.com' },
      update: {},
      create: {
        email: 'admin@portfolio.com',
        passwordHash: adminPassword,
        firstName: 'Admin',
        lastName: 'Portfolio',
        role: 'ADMIN'
      }
    });
    console.log('✅ Admin user created:', admin.email);

    // Créer un utilisateur teacher par défaut
    const teacherPassword = await bcrypt.hash('teacher123', 12);
    const teacher = await prisma.user.upsert({
      where: { email: 'teacher@portfolio.com' },
      update: {},
      create: {
        email: 'teacher@portfolio.com',
        passwordHash: teacherPassword,
        firstName: 'Teacher',
        lastName: 'Portfolio',
        role: 'TEACHER'
      }
    });
    console.log('✅ Teacher user created:', teacher.email);

    // Vérifier si les compétences existent déjà
    const existingCompetences = await prisma.competence.count();
    if (existingCompetences === 0) {
      // Insérer les compétences RNCP
      const competences = [
        // Bloc 1: Cadrer un projet
        {
          name: 'Rédiger un Cahier Des Charges (CDC)',
          description: 'Partir d\'une expression de besoins pour cadrer fonctionnellement un projet dans le respect du RGPD.',
          blocRncp: 'Cadrer',
          autoEvaluationLevel: 4
        },
        {
          name: 'Rédiger des spécifications techniques',
          description: 'Analyser un CDC pour cadrer techniquement un projet de développement.',
          blocRncp: 'Cadrer',
          autoEvaluationLevel: 4
        },
        {
          name: 'Déployer un environnement de travail',
          description: 'Mettre en place les outils de versionnage, partage et collaboration.',
          blocRncp: 'Cadrer',
          autoEvaluationLevel: 5
        },
        {
          name: 'Réaliser une maquette',
          description: 'Permettre au client de valider la structure en respectant l\'ergonomie et l\'accessibilité.',
          blocRncp: 'Cadrer',
          autoEvaluationLevel: 4
        },
        {
          name: 'Identifier les fonctionnalités',
          description: 'Modéliser les éléments et leurs interconnexions pour structurer l\'architecture.',
          blocRncp: 'Cadrer',
          autoEvaluationLevel: 3
        },
        {
          name: 'Rédiger une présentation',
          description: 'Présenter les choix techniques et maquettes en argumentant les décisions.',
          blocRncp: 'Cadrer',
          autoEvaluationLevel: 4
        },
        // Bloc 2: Développer une solution web
        {
          name: 'Développer le prototype',
          description: 'Présenter l\'architecture technique au client.',
          blocRncp: 'Developper',
          autoEvaluationLevel: 4
        },
        {
          name: 'Rédiger le code de la solution',
          description: 'Transcrire les fonctionnalités du CDC en respectant les normes.',
          blocRncp: 'Developper',
          autoEvaluationLevel: 5
        },
        {
          name: 'Intégrer les éléments',
          description: 'Respecter les dernières normes HTML, CSS, JS selon les maquettes.',
          blocRncp: 'Developper',
          autoEvaluationLevel: 5
        },
        {
          name: 'Implémenter le front-end',
          description: 'Développer l\'interface utilisateur de la solution web.',
          blocRncp: 'Developper',
          autoEvaluationLevel: 5
        },
        {
          name: 'Implémenter le back-end',
          description: 'Assurer la logique et la persistance des données côté serveur.',
          blocRncp: 'Developper',
          autoEvaluationLevel: 4
        },
        {
          name: 'Implémenter l\'authentification',
          description: 'Respecter les bonnes pratiques de sécurité pour l\'accès.',
          blocRncp: 'Developper',
          autoEvaluationLevel: 4
        },
        {
          name: 'Implémenter un plan de tests',
          description: 'Concevoir les tests unitaires et d\'intégration.',
          blocRncp: 'Developper',
          autoEvaluationLevel: 3
        },
        {
          name: 'Déployer une application web',
          description: 'Utiliser un serveur pour rendre l\'application accessible.',
          blocRncp: 'Developper',
          autoEvaluationLevel: 4
        },
        // Bloc 3: Assurance qualité
        {
          name: 'Rédiger une documentation technique',
          description: 'Garantir la pérennité et l\'évolution future de la solution.',
          blocRncp: 'Qualite',
          autoEvaluationLevel: 4
        },
        {
          name: 'Rédiger une documentation utilisateur',
          description: 'Apporter un support aux utilisateurs pour leur autonomie.',
          blocRncp: 'Qualite',
          autoEvaluationLevel: 3
        },
        {
          name: 'Monitorer le lancement',
          description: 'Recueillir les retours utilisateurs pour évaluer la qualité.',
          blocRncp: 'Qualite',
          autoEvaluationLevel: 3
        },
        {
          name: 'Identifier des améliorations',
          description: 'Analyser les retours et données de trafic pour améliorer la solution.',
          blocRncp: 'Qualite',
          autoEvaluationLevel: 3
        },
        {
          name: 'Analyser l\'ergonomie et l\'accessibilité',
          description: 'Identifier les axes d\'amélioration selon les normes et bonnes pratiques.',
          blocRncp: 'Qualite',
          autoEvaluationLevel: 3
        },
        {
          name: 'Rédiger un document argumentatif',
          description: 'Lister les propositions d\'améliorations pour validation.',
          blocRncp: 'Qualite',
          autoEvaluationLevel: 3
        }
      ];

      for (const competence of competences) {
        await prisma.competence.create({ data: competence });
      }
      console.log('✅ Competences created successfully');
    }

    // Vérifier si les tags existent déjà
    const existingTags = await prisma.tag.count();
    if (existingTags === 0) {
      const tags = [
        'Laravel', 'Docker', 'Tailwind CSS', 'PHP', 'SQL', 'HTML',
        'JavaScript', 'Bootstrap', 'Next.js', 'TypeScript', 'React',
        'Node.js', 'Express', 'Prisma', 'MySQL', 'MongoDB',
        'Git', 'GitHub', 'VS Code', 'Figma', 'API', 'REST',
        'JWT', 'Zod', 'Jest', 'Swagger'
      ];

      for (const tagName of tags) {
        await prisma.tag.create({ data: { name: tagName } });
      }
      console.log('✅ Tags created successfully');
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Default login credentials:');
    console.log('Admin: admin@portfolio.com / admin123');
    console.log('Teacher: teacher@portfolio.com / teacher123');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
