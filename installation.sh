echo "Installation en cours"
sudo apt update 

sudo apt install nodejs 

apt install mysql 
./Base_de_donnees/MontageBD.sh


cd ./server 
npm install
npm install redaxios

cd ../client
npm install