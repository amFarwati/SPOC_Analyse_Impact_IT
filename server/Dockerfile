# Définir l'image de base
FROM node:14

# Définir le répertoire de travail dans le conteneur Docker
WORKDIR /usr/src/app

# Copier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Exposer le port sur lequel l'application s'exécute
EXPOSE 4000

# Définir la commande pour exécuter l'application
CMD [ "node", "server.js" ]