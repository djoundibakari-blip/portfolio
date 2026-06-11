# Guide de Déploiement

## 🚀 Déploiement en Production

### Prérequis

- Node.js 18+
- MySQL 8.0+
- Nginx (optionnel, pour le reverse proxy)
- PM2 (pour la gestion des processus)

### 1. Configuration de la base de données

```bash
# Créer la base de données
mysql -u root -p
CREATE DATABASE portfolio_rncp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON portfolio_rncp.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Configuration de l'environnement

```bash
# Copier et modifier le fichier d'environnement
cp .env.example .env
```

Variables à configurer :
```env
DATABASE_URL="mysql://portfolio_user:secure_password@localhost:3306/portfolio_rncp"
NODE_ENV=production
JWT_SECRET=votre-clé-secrète-très-sécurisée
PORT=3001
```

### 3. Installation des dépendances

```bash
npm ci --production
```

### 4. Migration de la base de données

```bash
# Si vous utilisez Prisma
npm run db:migrate

# Ou importer le schéma SQL
mysql -u portfolio_user -p portfolio_rncp < schema.sql
```

### 5. Peuplement des données

```bash
npm run db:seed
```

### 6. Démarrage avec PM2

```bash
# Installer PM2 globalement
npm install -g pm2

# Créer le fichier de configuration PM2
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'portfolio-backend',
    script: './src/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
EOF

# Démarrer l'application
pm2 start ecosystem.config.js

# Sauvegarder la configuration
pm2 save

# Configurer le démarrage automatique
pm2 startup
```

### 7. Configuration de Nginx (optionnel)

```nginx
# /etc/nginx/sites-available/portfolio-backend
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activer le site :
```bash
sudo ln -s /etc/nginx/sites-available/portfolio-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 8. Configuration SSL avec Let's Encrypt

```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx

# Obtenir le certificat
sudo certbot --nginx -d api.yourdomain.com

# Renouvellement automatique
sudo crontab -e
# Ajouter : 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔒 Sécurité

### 1. Mise à jour régulière
```bash
npm audit fix
sudo apt update && sudo apt upgrade
```

### 2. Configuration du pare-feu
```bash
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 3. Monitoring avec PM2
```bash
# Voir les logs
pm2 logs

# Monitorer les performances
pm2 monit

# Redémarrer si nécessaire
pm2 restart portfolio-backend
```

## 📊 Monitoring et Logs

### 1. Configuration des logs
```bash
# Créer le dossier de logs
mkdir -p logs

# Rotation des logs avec logrotate
sudo cat > /etc/logrotate.d/portfolio-backend << EOF
/path/to/your/project/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        pm2 reloadLogs
    endscript
}
EOF
```

### 2. Health check
```bash
# Vérifier que l'API fonctionne
curl http://localhost:3001/health

# Monitoring avec UptimeRobot ou similaire
```

## 🚨 Gestion des erreurs

### 1. Backup de la base de données
```bash
# Script de backup automatique
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u portfolio_user -p portfolio_rncp > backups/portfolio_rncp_$DATE.sql
find backups/ -name "*.sql" -mtime +7 -delete
```

### 2. Restauration
```bash
mysql -u portfolio_user -p portfolio_rncp < backup_file.sql
```

## 🔄 Mise à jour

### 1. Processus de déploiement
```bash
# 1. Backup
pm2 stop portfolio-backend
mysqldump -u portfolio_user -p portfolio_rncp > backup_before_update.sql

# 2. Mise à jour du code
git pull origin main
npm ci --production

# 3. Migration si nécessaire
npm run db:migrate

# 4. Redémarrage
pm2 start portfolio-backend

# 5. Vérification
curl http://localhost:3001/health
```

## 🐛 Débogage en production

### 1. Logs détaillés
```bash
# Activer les logs de debug
export NODE_ENV=production
export DEBUG=portfolio:*

# Voir les logs en temps réel
pm2 logs portfolio-backend --lines 100
```

### 2. Connexion directe à la base
```bash
mysql -u portfolio_user -p portfolio_rncp
```

## 📈 Performance

### 1. Optimisation MySQL
```sql
-- Activer le query cache
SET GLOBAL query_cache_size = 268435456;
SET GLOBAL query_cache_type = ON;

-- Index recommandés
CREATE INDEX idx_projects_is_public ON projects(is_public);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_contact_messages_is_read ON contact_messages(is_read);
```

### 2. Configuration PM2 avancée
```javascript
module.exports = {
  apps: [{
    name: 'portfolio-backend',
    script: './src/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024'
  }]
};
```

## 🔧 Maintenance

### 1. Nettoyage régulier
```bash
# Nettoyer les anciens logs
find logs/ -name "*.log" -mtime +30 -delete

# Nettoyer les uploads non utilisés
find uploads/ -type f -mtime +90 -delete
```

### 2. Surveillance
```bash
# Script de monitoring
#!/bin/bash
if ! curl -f http://localhost:3001/health > /dev/null 2>&1; then
    echo "API is down, restarting..."
    pm2 restart portfolio-backend
    # Envoyer une notification
fi
```
