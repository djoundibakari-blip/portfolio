-- Base de données pour le portfolio RNCP
CREATE DATABASE IF NOT EXISTS portfolio_rncp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_rncp;

-- Table des utilisateurs (admin)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role ENUM('admin', 'teacher') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des compétences RNCP
CREATE TABLE competences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    bloc_rncp ENUM('Cadrer', 'Developper', 'Qualite') NOT NULL,
    auto_evaluation_level INT DEFAULT 1 CHECK (auto_evaluation_level BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des projets
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    github_link VARCHAR(500),
    live_link VARCHAR(500),
    image_url VARCHAR(500),
    is_public BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des tags/technologies
CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table de liaison projets-tags (many-to-many)
CREATE TABLE project_tags (
    project_id INT,
    tag_id INT,
    PRIMARY KEY (project_id, tag_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Table de preuves (liaison projets-compétences)
CREATE TABLE evidences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    competence_id INT NOT NULL,
    description TEXT,
    proof_level INT DEFAULT 1 CHECK (proof_level BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (competence_id) REFERENCES competences(id) ON DELETE CASCADE,
    UNIQUE KEY unique_project_competence (project_id, competence_id)
);

-- Table des messages de contact
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table pour le CV PDF
CREATE TABLE cv_versions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    version_name VARCHAR(100) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertion des compétences RNCP de base
INSERT INTO competences (name, description, bloc_rncp, auto_evaluation_level) VALUES
-- Bloc 1: Cadrer un projet
('Rédiger un Cahier Des Charges (CDC)', 'Partir d''une expression de besoins pour cadrer fonctionnellement un projet dans le respect du RGPD.', 'Cadrer', 4),
('Rédiger des spécifications techniques', 'Analyser un CDC pour cadrer techniquement un projet de développement.', 'Cadrer', 4),
('Déployer un environnement de travail', 'Mettre en place les outils de versionnage, partage et collaboration.', 'Cadrer', 5),
('Réaliser une maquette', 'Permettre au client de valider la structure en respectant l''ergonomie et l''accessibilité.', 'Cadrer', 4),
('Identifier les fonctionnalités', 'Modéliser les éléments et leurs interconnexions pour structurer l''architecture.', 'Cadrer', 3),
('Rédiger une présentation', 'Présenter les choix techniques et maquettes en argumentant les décisions.', 'Cadrer', 4),

-- Bloc 2: Développer une solution web
('Développer le prototype', 'Présenter l''architecture technique au client.', 'Developper', 4),
('Rédiger le code de la solution', 'Transcrire les fonctionnalités du CDC en respectant les normes.', 'Developper', 5),
('Intégrer les éléments', 'Respecter les dernières normes HTML, CSS, JS selon les maquettes.', 'Developper', 5),
('Implémenter le front-end', 'Développer l''interface utilisateur de la solution web.', 'Developper', 5),
('Implémenter le back-end', 'Assurer la logique et la persistance des données côté serveur.', 'Developper', 4),
('Implémenter l''authentification', 'Respecter les bonnes pratiques de sécurité pour l''accès.', 'Developper', 4),
('Implémenter un plan de tests', 'Concevoir les tests unitaires et d''intégration.', 'Developper', 3),
('Déployer une application web', 'Utiliser un serveur pour rendre l''application accessible.', 'Developper', 4),

-- Bloc 3: Assurance qualité
('Rédiger une documentation technique', 'Garantir la pérennité et l''évolution future de la solution.', 'Qualite', 4),
('Rédiger une documentation utilisateur', 'Apporter un support aux utilisateurs pour leur autonomie.', 'Qualite', 3),
('Monitorer le lancement', 'Recueillir les retours utilisateurs pour évaluer la qualité.', 'Qualite', 3),
('Identifier des améliorations', 'Analyser les retours et données de trafic pour améliorer la solution.', 'Qualite', 3),
('Analyser l''ergonomie et l''accessibilité', 'Identifier les axes d''amélioration selon les normes et bonnes pratiques.', 'Qualite', 3),
('Rédiger un document argumentatif', 'Lister les propositions d''améliorations pour validation.', 'Qualite', 3);

-- Insertion des projets de base
INSERT INTO projects (title, description, github_link, category, is_public, is_featured) VALUES
('Réseau Social d''Entreprise (ESN)', 'Réseau interne à une entreprise avec un fil d''actualité, une page de connexion et un système de création de compte. Développé avec Laravel, Docker et Tailwind CSS.', 'https://github.com/Djoundi', 'Projet Epitech', TRUE, TRUE),
('My Cinema', 'Interface de home cinema complète avec catalogue de films, gestion des horaires et système de réservation en ligne. Développé en PHP, SQL et Tailwind CSS.', 'https://github.com/Djoundi', 'Projet Epitech', TRUE, TRUE),
('Générateur de CV', 'Application web permettant de générer un CV personnalisé uniquement en saisissant ses informations personnelles. Interface simple et intuitive.', 'https://github.com/Djoundi', 'Projet Epitech', TRUE, TRUE),
('Portfolio Personnel', 'Ce portfolio que vous consultez actuellement ! Conçu avec Next.js, TypeScript et Tailwind CSS pour présenter mes compétences et projets.', 'https://github.com/Djoundi', 'Projet Personnel', TRUE, FALSE);

-- Insertion des tags
INSERT INTO tags (name) VALUES
('Laravel'), ('Docker'), ('Tailwind CSS'), ('PHP'), ('SQL'), ('HTML'),
('JavaScript'), ('Bootstrap'), ('Next.js'), ('TypeScript');

-- Liaison projets-tags
INSERT INTO project_tags (project_id, tag_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4),  -- Réseau Social
(2, 4), (2, 5), (2, 3), (2, 6),  -- My Cinema
(3, 6), (3, 7), (3, 8), (3, 4),  -- Générateur CV
(4, 9), (4, 10), (4, 3);         -- Portfolio
