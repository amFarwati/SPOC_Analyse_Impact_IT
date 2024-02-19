echo "déploiement du server"
cd ./server 
gnome-terminal -- bash -c "./deploy.sh ; bash"


echo "déploiement du  client"
cd ../client
gnome-terminal -- bash -c "./deploy.sh ; bash"
