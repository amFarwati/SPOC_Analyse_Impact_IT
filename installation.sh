# Définition des couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}Installation en cours${NC}"

# Mise à jour des paquets
echo -e "${GREEN}Mise à jour des paquets...${NC}"
sudo apt update 

#On vide les logs d'installation.
> installation.log

# Installation de Node.js et npm
if ! command -v node &> /dev/null
then
    echo -e "${RED}Node.js n'est pas installé. Installation en cours...${NC}" | tee -a installation.log
    sudo apt install -y nodejs npm
else
    echo -e "${GREEN}Node.js est déjà installé.${NC}" | tee -a installation.log
fi

# Installation de MySQL
if ! command -v mysql &> /dev/null
then
    echo -e "${RED}MySQL n'est pas installé. Installation en cours...${NC}" | tee -a installation.log
    sudo apt-get install -y mysql-server
else
    echo -e "${GREEN}MySQL est déjà installé.${NC}" | tee -a installation.log
fi

# Configuration de MySQL
echo -e "${GREEN}Configuration de MySQL en cours...${NC}"
cd Base_de_donnees
bash ./MontageBD.sh
cd ../
echo -e "${GREEN}Configuration de MySQL terminée${NC}"

# Installation dépendances server
cd server
echo -e "${GREEN}Installation des dépendances du serveur...${NC}"
npm install
npm install redaxios

# Installation dépendances client
cd ../client
echo -e "${GREEN}Installation des dépendances du client...${NC}"
npm install

echo -e "${GREEN}Installation terminée${NC}"