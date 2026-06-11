const authService = require('../services/authService');

class AuthController {
  // POST /api/auth/register - Inscription
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Inscription réussie',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/auth/login - Connexion
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      
      res.json({
        success: true,
        message: 'Connexion réussie',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/auth/profile - Obtenir le profil utilisateur
  async getProfile(req, res, next) {
    try {
      const user = await authService.getProfile(req.user.id);
      
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/auth/profile - Mettre à jour le profil
  async updateProfile(req, res, next) {
    try {
      const user = await authService.updateProfile(req.user.id, req.body);
      
      res.json({
        success: true,
        message: 'Profil mis à jour avec succès',
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/auth/password - Mettre à jour le mot de passe
  async updatePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      const result = await authService.updatePassword(req.user.id, currentPassword, newPassword);
      
      res.json({
        success: true,
        ...result
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/auth/users - Lister tous les utilisateurs (admin seulement)
  async getAllUsers(req, res, next) {
    try {
      const users = await authService.getAllUsers();
      
      res.json({
        success: true,
        data: users,
        count: users.length
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/auth/users/:id - Supprimer un utilisateur (admin seulement)
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const result = await authService.deleteUser(parseInt(id));
      
      res.json({
        success: true,
        ...result
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/auth/verify-token - Vérifier la validité d'un token
  async verifyToken(req, res, next) {
    try {
      // Si on arrive ici, c'est que le middleware d'auth a validé le token
      res.json({
        success: true,
        message: 'Token valide',
        data: {
          user: req.user
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
