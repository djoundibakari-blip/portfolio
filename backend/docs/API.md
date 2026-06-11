# Documentation API Portfolio RNCP

## 🚀 Introduction

Cette API RESTful fournit les endpoints pour gérer le portfolio hybride (apprentissage + présentation) avec MySQL et Node.js/Express.

## 🔐 Authentification

La plupart des endpoints d'administration nécessitent une authentification JWT.

### Headers requis
```
Authorization: Bearer <votre_token_jwt>
```

## 📚 Endpoints

### Authentification

#### Inscription
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "admin@portfolio.com",
  "password": "password123",
  "firstName": "Admin",
  "lastName": "User",
  "role": "ADMIN"
}
```

#### Connexion
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@portfolio.com",
  "password": "password123"
}
```

#### Profil utilisateur
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### Projets

#### Lister les projets publics
```http
GET /api/projects
```

#### Lister tous les projets (admin)
```http
GET /api/projects/all
Authorization: Bearer <token>
```

#### Créer un projet (admin)
```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Mon projet",
  "description": "Description du projet",
  "github": "https://github.com/user/project",
  "live": "https://project.com",
  "category": "Web Development",
  "tags": ["JavaScript", "Node.js"],
  "isPublic": true,
  "featured": false
}
```

#### Mettre à jour un projet (admin)
```http
PUT /api/projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Titre mis à jour",
  "description": "Nouvelle description"
}
```

#### Supprimer un projet (admin)
```http
DELETE /api/projects/:id
Authorization: Bearer <token>
```

### Compétences RNCP

#### Lister les compétences publiques
```http
GET /api/competences
```

#### Lister les compétences par bloc
```http
GET /api/competences/bloc/Cadrer
GET /api/competences/bloc/Developper
GET /api/competences/bloc/Qualite
```

#### Créer une compétence (admin)
```http
POST /api/competences
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Nouvelle compétence",
  "description": "Description de la compétence",
  "blocRncp": "Cadrer",
  "autoEvaluationLevel": 4
}
```

### Contact

#### Envoyer un message
```http
POST /api/contact
Content-Type: application/json

{
  "name": "Jean Dupont",
  "email": "jean.dupont@example.com",
  "subject": "Proposition de collaboration",
  "message": "Bonjour, je souhaiterais discuter d'un projet..."
}
```

#### Lister les messages (admin)
```http
GET /api/contact/messages
Authorization: Bearer <token>
```

#### Marquer un message comme lu (admin)
```http
PATCH /api/contact/messages/:id/read
Authorization: Bearer <token>
```

## 📊 Réponses API

### Succès
```json
{
  "success": true,
  "data": {
    // Données demandées
  },
  "message": "Opération réussie"
}
```

### Erreur
```json
{
  "success": false,
  "message": "Message d'erreur",
  "errors": [
    {
      "field": "email",
      "message": "Email invalide"
    }
  ]
}
```

## 🔍 Filtrage et pagination

### Filtrage des projets
```http
GET /api/projects?category=Web%20Development
GET /api/projects/featured
```

### Filtrage des messages
```http
GET /api/contact/messages?isRead=false
```

## 🚨 Codes d'erreur

- `200` - Succès
- `201` - Créé avec succès
- `400` - Erreur de validation
- `401` - Non authentifié
- `403` - Accès refusé
- `404` - Ressource non trouvée
- `429` - Trop de requêtes
- `500` - Erreur serveur

## 📖 Documentation Interactive

La documentation Swagger est disponible sur :
`http://localhost:3001/api-docs`

## 🧪 Tests

Pour tester l'API :
```bash
npm test
```

## 🚀 Déploiement

### Variables d'environnement requises
- `DATABASE_URL` - Chaîne de connexion MySQL
- `JWT_SECRET` - Clé secrète pour les tokens
- `NODE_ENV` - Environnement (development/production)
- `PORT` - Port du serveur (défaut: 3001)
