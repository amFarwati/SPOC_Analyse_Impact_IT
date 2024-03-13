echo "Installation en cours"

# Mise à jour des paquets
sudo apt update 

# Installation de Node.js et npm
if ! command -v node &> /dev/null
then
    echo "Node.js n'est pas installé. Installation en cours..."
    sudo apt install -y nodejs npm
else
    echo "Node.js est déjà installé."
fi

# Installation de MySQL
if ! command -v mysql &> /dev/null
then
    echo "MySQL n'est pas installé. Installation en cours..."
    sudo apt install -y mysql-server
else
    echo "MySQL est déjà installé."
fi



# Configuration de MySQL
echo "Configuration de MySQL en cours..."
bash ./Base_de_donnees/MontageBD.sh
echo "Configuration de MySQL terminée"

# Installation dépendances server
cd server
npm install
npm install redaxios

# Installation dépendances client
cd ../client
npm install

echo "Installation terminée"