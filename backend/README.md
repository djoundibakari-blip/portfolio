# Backend Portfolio RNCP

Backend API pour le portfolio hybride (apprentissage + présentation) avec MySQL et Node.js/Express.

## 🚀 Stack Technique

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM pour MySQL
- **JWT** - Authentification
- **Zod** - Validation des données
- **Swagger** - Documentation API

## 📁 Structure du Projet

```
backend/
├── src/
│   ├── config/          # Configuration (BDD, validations)
│   ├── controllers/     # Contrôleurs API
│   ├── middleware/      # Middleware (auth, erreurs)
│   ├── repositories/    # Accès aux données (Prisma)
│   ├── routes/          # Routes Express
│   ├── services/        # Logique métier
│   ├── utils/           # Utilitaires (logger)
│   └── server.js        # Point d'entrée
├── prisma/
│   └── schema.prisma    # Schéma de base de données
├── tests/               # Tests unitaires
├── docs/                # Documentation
├── uploads/             # Fichiers uploadés
└── schema.sql           # Script SQL initial
```

## 🛠️ Installation

1. **Installer les dépendances**
```bash
npm install
```

2. **Configurer l'environnement**
```bash
cp .env.example .env
# Modifier .env avec vos configurations
```

3. **Configurer la base de données MySQL**
```bash
# Créer la base de données
mysql -u root -p < schema.sql
```

4. **Générer le client Prisma**
```bash
npm run db:generate
```

5. **Démarrer le serveur**
```bash
# Développement
npm run dev

# Production
npm start
```

## 📊 Modèle de Données

### Utilisateurs
- Gestion des administrateurs/enseignants
- Authentification JWT

### Projets
- Informations du projet (titre, description, liens)
- Tags/technologies
- Visibilité (public/privé)
- Projets featured

### Compétences RNCP
- 3 blocs : Cadrer, Développer, Qualité
- Auto-évaluation (1-5)
- Liaison avec les projets (preuves)

### Contact
- Messages du formulaire de contact
- Gestion de lecture/non-lecture

## 🔐 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/profile` - Profil utilisateur
- `PUT /api/auth/profile` - Mettre à jour profil

### Projets
- `GET /api/projects` - Projets publics
- `GET /api/projects/all` - Tous les projets (admin)
- `GET /api/projects/:id` - Détail projet
- `POST /api/projects` - Créer projet (admin)
- `PUT /api/projects/:id` - Mettre à jour (admin)
- `DELETE /api/projects/:id` - Supprimer (admin)

### Compétences
- `GET /api/competences` - Compétences publiques
- `GET /api/competences/bloc/:bloc` - Par bloc RNCP
- `POST /api/competences` - Créer compétence (admin)
- `PUT /api/competences/:id` - Mettre à jour (admin)

### Contact
- `POST /api/contact` - Envoyer message
- `GET /api/contact/messages` - Messages (admin)
- `PATCH /api/contact/messages/:id/read` - Marquer lu (admin)

## 🧪 Tests

```bash
# Lancer tous les tests
npm test

# Mode watch
npm run test:watch
```

## 📚 Documentation

La documentation Swagger est disponible sur :
`http://localhost:3001/api-docs`

## 🔧 Scripts Utiles

```bash
# Migration Prisma
npm run db:migrate

# Studio Prisma (interface graphique)
npm run db:studio

# Générer client Prisma
npm run db:generate
```

## 🚀 Déploiement

1. **Variables d'environnement**
   - `DATABASE_URL` - Chaîne de connexion MySQL
   - `JWT_SECRET` - Clé secrète JWT
   - `NODE_ENV` - Environnement (production)

2. **Base de données**
   - MySQL 8.0+ recommandé
   - Configurer `schema.sql` pour l'initialisation

3. **Sécurité**
   - HTTPS en production
   - Variables d'environnement sécurisées
   - Rate limiting configuré

## 📝 Notes

- Les routes publiques ne retournent que les données `is_public: true`
- L'accès complet nécessite une authentification admin
- Les validations utilisent Zod pour la sécurité
- Les logs sont configurés pour le développement et la production
