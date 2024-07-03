# Utiliser l'image de base officielle de Vault
FROM vault:latest

# Copier les fichiers de configuration de Vault
COPY vault-config.hcl /vault/vault-config.hcl

# Exposer le port de Vault
EXPOSE 8200

# Démarrer Vault avec la configuration spécifiée
CMD ["vault", "server", "-config=/vault/config/vault-config.hcl"]
