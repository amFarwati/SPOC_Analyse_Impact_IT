echo "Installation en cours"
sudo apt update 

sudo apt install nodejs 

<<<<<<< Updated upstream
apt install mysql 
./Base_de_donnees/MontageBD.sh


cd ./server 
=======
# Installation de MySQL
if ! command -v mysql &> /dev/null
then
    echo "MySQL n'est pas installé. Installation en cours..."
    sudo apt install -y mysql-server
else
    echo "MySQL est déjà installé."
fi

# Installation de git
if ! command -v git &> /dev/null
then
    echo "Git n'est pas installé. Installation en cours..."
    sudo apt install -y git
else
    echo "Git est déjà installé."
fi

# Configuration de MySQL
echo "Configuration de MySQL en cours..."
bash ./Base_de_donnees/MontageBD.sh
echo "Configuration de MySQL terminée"

# Installation dépendances server
cd server
>>>>>>> Stashed changes
npm install
npm install redaxios

cd ../client
npm install