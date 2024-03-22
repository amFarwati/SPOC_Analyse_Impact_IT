echo "Lancement du server"
cd ./server 
npm install
npm install cors

# Check if gnome-terminal is installed
if ! which gnome-terminal > /dev/null; then
   sudo apt-get install -y gnome-terminal
fi

sed -i 's/host: "mysql-db"/host: "localhost"/g' ./server.js

gnome-terminal -- bash -c "node server.js ; bash"

echo "Lancement client"
cd ../client
npm install
gnome-terminal -- bash -c "npm start ; bash"