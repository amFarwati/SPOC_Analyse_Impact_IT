sudo chown -R numuser:www-data /var/www/opsian.insa-lyon.fr/
sudo chmod -R 755 /var/www/opsian.insa-lyon.fr/
sudo systemctl restart nginx
pm2 restart server/server.js