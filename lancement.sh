echo "Lancement du server"
cd ./server 
npm install

gnome-terminal -- bash -c "node server.js ; bash"


echo "Lancement client"
cd ../client
npm install
gnome-terminal -- bash -c "npm start ; bash"
