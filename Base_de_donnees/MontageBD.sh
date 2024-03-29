echo "Création de la BD. Cette opération mets à jour votre Base de données si vous avez déjà une base de données opsian. Elle écrase les données utilisateurs déjà présentes."
sudo mysql -u root -p -e "source ./initBD.sql"
sudo systemctl restart mysql