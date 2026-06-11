const z = require('zod');

// Schémas de validation avec Zod

// Validation pour les projets
const projectSchema = z.object({
  title: z.string().min(1, "Le titre est requis").max(255),
  description: z.string().min(1, "La description est requise"),
  startDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
  endDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
  githubLink: z.string().url().optional().nullable(),
  liveLink: z.string().url().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  isPublic: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  category: z.string().optional(),
  tags: z.array(z.string()).optional()
});

// Validation pour les compétences
const competenceSchema = z.object({
  name: z.string().min(1, "Le nom est requis").max(255),
  description: z.string().optional(),
  blocRncp: z.enum(['Cadrer', 'Developper', 'Qualite']),
  autoEvaluationLevel: z.number().int().min(1).max(5).default(1)
});

// Validation pour les messages de contact
const contactSchema = z.object({
  name: z.string().min(1, "Le nom est requis").max(255),
  email: z.string().email("Email invalide"),
  subject: z.string().min(1, "Le sujet est requis").max(255),
  message: z.string().min(1, "Le message est requis").min(10, "Le message doit contenir au moins 10 caractères")
});

// Validation pour l'authentification
const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères")
});

const registerSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  firstName: z.string().min(1, "Le prénom est requis").max(100),
  lastName: z.string().min(1, "Le nom est requis").max(100),
  role: z.enum(['ADMIN', 'TEACHER']).default('ADMIN')
});

// Validation pour les preuves (evidences)
const evidenceSchema = z.object({
  projectId: z.number().int().positive(),
  competenceId: z.number().int().positive(),
  description: z.string().optional(),
  proofLevel: z.number().int().min(1).max(5).default(1)
});

// Middleware de validation
const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Erreur de validation",
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      next(error);
    }
  };
};

module.exports = {
  projectSchema,
  competenceSchema,
  contactSchema,
  loginSchema,
  registerSchema,
  evidenceSchema,
  validate
};
