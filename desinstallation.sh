# Définir les codes de couleur
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color


echo -e "${GREEN}Désinstallation en cours${NC}"

sudo apt update

# Désinstallation de Node.js et npm
if command -v node &> /dev/null
then
    # Vérifier si Node.js était déjà installé
    last_line=$(tail -n 2 installation.log | head -n 1)
    if [[ $last_line == *"Node.js est déjà installé."* ]]; then
        echo -e "${RED}Attention : Node.js était déjà installé avant l'installation du projet.${NC}"
    fi
    echo -e "${GREEN}Node.js est installé. Voulez-vous le désinstaller ? (y/n)${NC}"
    read answer
    if [[ "$answer" =~ ^[Yy]$ ]]; then
        sudo apt purge -y nodejs npm
    fi
else
    echo -e "${RED}Node.js n'est pas installé.${NC}"
fi

# Désinstallation de MySQL
if command -v mysql &> /dev/null
then
    # Vérifier si Node.js était déjà installé
    last_line=$(tail -n 1 installation.log | head -n 1)
    if [[ $last_line == *"MySQL est déjà installé."* ]]; then
        echo -e "${RED}Attention : MySQL était déjà installé avant l'installation du projet.${NC}"
    fi
    echo -e "${GREEN}MySQL est installé. Voulez-vous le désinstaller ? (y/n)${NC}"
    read answer
    if [[ "$answer" =~ ^[Yy]$ ]]; then
        sudo apt purge -y mysql-server
    else 
        # Suppression de la base de données
        echo -e "${GREEN}Voulez-vous supprimer la base de données opsian ? (y/n)${NC}"
        read answer
        if [[ "$answer" =~ ^[Yy]$ ]]; then
            sudo mysql -u numuser -pspocBDD -e "DROP DATABASE IF EXISTS opsian;"
            echo -e "${GREEN}La base de données opsian a été supprimée.${NC}, il est recommandé de supprimer l'utilisateur numuser, veuillez saisir votre mot de passe root :"
            sudo mysql -u root -p -e "DROP USER numuser;"
        fi
    fi
else
    echo -e "${RED}MySQL n'est pas installé.${NC}"
fi

# Suppression du projet cloné
cd ../
if [ -d "SPOC_Analyse_Impact_IT" ]; then
    echo -e "${GREEN}Le projet cloné existe. Voulez-vous le supprimer ? (y/n)${NC}"
    read answer
    if [[ "$answer" =~ ^[Yy]$ ]]; then
        rm -rf SPOC_Analyse_Impact_IT
    fi
else
    echo -e "${RED}Le projet cloné n'existe pas.${NC}"
fi

# Désinstallation de git
if command -v git &> /dev/null
then
    echo -e "${GREEN}git est installé. Voulez-vous le désinstaller ? (y/n)${NC}"
    read answer
    if [[ "$answer" =~ ^[Yy]$ ]]; then
        sudo apt purge -y git
    fi
else
    echo -e "${RED}git n'est pas installé.${NC}"
fi

sudo apt autoremove -y
sudo apt autoclean -y

echo -e "${GREEN}Désinstallation terminée${NC}"
echo -e "${GREEN}Merci d'avoir utilisé Opsian.${NC}"