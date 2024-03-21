echo "Création de la BD"
sudo mysql -u root -p -e "source ./initBD.sql"
sudo systemctl restart mysql