echo "Création de la BD"
mysql -u root -p -e "source ./initBD.sql"
sudo systemctl restart mysql