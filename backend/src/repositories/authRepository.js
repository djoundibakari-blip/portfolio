const { prisma } = require('../config/database');
const bcrypt = require('bcryptjs');

class AuthRepository {
  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email }
    });
  }

  async findById(id) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async create(userData) {
    const { password, ...userWithoutPassword } = userData;
    
    // Hasher le mot de passe
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        ...userWithoutPassword,
        passwordHash
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return user;
  }

  async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async updatePassword(userId, newPassword) {
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    return await prisma.user.update({
      where: { id: userId },
      data: { passwordHash }
    });
  }

  async updateProfile(userId, data) {
    const { password, ...profileData } = data;
    
    if (password) {
      const saltRounds = 12;
      profileData.passwordHash = await bcrypt.hash(password, saltRounds);
    }

    return await prisma.user.update({
      where: { id: userId },
      data: profileData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async deleteUser(id) {
    return await prisma.user.delete({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true
      }
    });
  }
}

module.exports = new AuthRepository();
