# Utiliser une image Node.js comme base
FROM node:21

# Définir le répertoire de travail
WORKDIR /app

# Installer pnpm globalement
RUN npm install -g pnpm

# Installer les dépendances de l'application
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install

# Exposer le port de l'application
EXPOSE 3000

# Commande par défaut pour démarrer l'application
CMD ["pnpm", "run", "dev"]
