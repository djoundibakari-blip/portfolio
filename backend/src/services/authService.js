const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/authRepository');
const { logger } = require('../utils/logger');

class AuthService {
  async register(userData) {
    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await authRepository.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('Un utilisateur avec cet email existe déjà');
      }

      // Créer l'utilisateur
      const user = await authRepository.create(userData);
      
      // Générer le token
      const token = this.generateToken(user);
      
      logger.info(`Nouvel utilisateur créé: ${user.email}`);
      
      return {
        user,
        token
      };
    } catch (error) {
      logger.error('Erreur dans register:', error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      // Trouver l'utilisateur
      const user = await authRepository.findByEmail(email);
      if (!user) {
        throw new Error('Email ou mot de passe incorrect');
      }

      // Vérifier le mot de passe
      const isValidPassword = await authRepository.validatePassword(password, user.passwordHash);
      if (!isValidPassword) {
        throw new Error('Email ou mot de passe incorrect');
      }

      // Générer le token
      const token = this.generateToken(user);
      
      // Retourner l'utilisateur sans le mot de passe
      const userResponse = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
      
      logger.info(`Connexion réussie: ${user.email}`);
      
      return {
        user: userResponse,
        token
      };
    } catch (error) {
      logger.error('Erreur dans login:', error);
      throw error;
    }
  }

  async getProfile(userId) {
    try {
      const user = await authRepository.findById(userId);
      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }
      
      return user;
    } catch (error) {
      logger.error('Erreur dans getProfile:', error);
      throw error;
    }
  }

  async updateProfile(userId, userData) {
    try {
      // Si l'email est modifié, vérifier qu'il n'existe pas déjà
      if (userData.email) {
        const existingUser = await authRepository.findByEmail(userData.email);
        if (existingUser && existingUser.id !== userId) {
          throw new Error('Un utilisateur avec cet email existe déjà');
        }
      }

      const user = await authRepository.updateProfile(userId, userData);
      
      logger.info(`Profil mis à jour: ${user.email}`);
      
      return user;
    } catch (error) {
      logger.error('Erreur dans updateProfile:', error);
      throw error;
    }
  }

  async updatePassword(userId, currentPassword, newPassword) {
    try {
      // Récupérer l'utilisateur avec le mot de passe
      const user = await authRepository.findByEmail(userId);
      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }

      // Vérifier le mot de passe actuel
      const isValidPassword = await authRepository.validatePassword(currentPassword, user.passwordHash);
      if (!isValidPassword) {
        throw new Error('Mot de passe actuel incorrect');
      }

      // Mettre à jour le mot de passe
      await authRepository.updatePassword(userId, newPassword);
      
      logger.info(`Mot de passe mis à jour pour l'utilisateur: ${user.email}`);
      
      return { message: 'Mot de passe mis à jour avec succès' };
    } catch (error) {
      logger.error('Erreur dans updatePassword:', error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      return await authRepository.getAllUsers();
    } catch (error) {
      logger.error('Erreur dans getAllUsers:', error);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const user = await authRepository.findById(userId);
      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }

      await authRepository.deleteUser(userId);
      
      logger.info(`Utilisateur supprimé: ${user.email}`);
      
      return { message: 'Utilisateur supprimé avec succès' };
    } catch (error) {
      logger.error('Erreur dans deleteUser:', error);
      throw error;
    }
  }

  generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token invalide');
    }
  }
}

module.exports = new AuthService();
