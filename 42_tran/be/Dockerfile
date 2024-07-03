# Dockerfile

# Utilisation de l'image de base Python
FROM python:3.9

# Définition de l'environnement de travail dans le conteneur
WORKDIR /app

# Copie du fichier requirements.txt et installation des dépendances
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copie du reste du code dans le conteneur
COPY . .

# Commande par défaut pour démarrer l'application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
