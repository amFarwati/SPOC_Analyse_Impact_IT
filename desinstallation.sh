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
        # Arrêter tous les processus Node.js en cours d'exécution
        pkill -f node

        # Désinstaller Node.js et npm
        sudo apt-get remove nodejs npm node
        sudo apt-get purge nodejs
        # Supprimer les fichiers de configuration et de données
        sudo rm -rf /usr/local/bin/npm 
        sudo rm -rf /usr/local/share/man/man1/node* 
        sudo rm -rf /usr/local/lib/dtrace/node.d 
        sudo rm -rf ~/.npm 
        sudo rm -rf ~/.node-gyp 
        sudo rm -rf /opt/local/bin/node 
        sudo rm -rf opt/local/include/node 
        sudo rm -rf /opt/local/lib/node_modules  
        sudo rm -rf /usr/local/lib/node*
        sudo rm -rf /usr/local/include/node*
        sudo rm -rf /usr/local/bin/node*

    fi
else
    echo -e "${RED}Node.js n'est pas installé.${NC}"
fi

# Désinstallation de MySQL
if command -v mysql &> /dev/null
then
    # Vérifier si MySQL était déjà installé
    last_line=$(tail -n 1 installation.log | head -n 1)
    if [[ $last_line == *"MySQL est déjà installé."* ]]; then
        echo -e "${RED}Attention : MySQL était déjà installé avant l'installation du projet.${NC}"
    fi
    echo -e "${GREEN}MySQL est installé. Voulez-vous le désinstaller ? (y/n)${NC}"
    read answer
    if [[ "$answer" =~ ^[Yy]$ ]]; then
        # Arrêter le service MySQL
        sudo systemctl stop mysql

        # Désinstaller les paquets MySQL
        sudo apt-get purge mysql-server mysql-client mysql-common mysql-server-core-* mysql-client-core-*

        # Supprimer les fichiers de configuration et de données
        sudo rm -rf /etc/mysql /var/lib/mysql
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
    echo -e "${GREEN}Supprimer le projet SPOC_ANALYSE_IMPACT_IT ? (Opsian) (y/n)${NC}"
    read answer
    if [[ "$answer" =~ ^[Yy]$ ]]; then
        rm -rf SPOC_Analyse_Impact_IT
    fi
else
    echo -e "${RED}Le projet n'existe pas.${NC}"
fi

# Désinstallation de git
if command -v git &> /dev/null
then
    echo -e "${GREEN}git est installé. Voulez-vous le désinstaller ? (y/n)${NC}"
    read answer
    if [[ "$answer" =~ ^[Yy]$ ]]; then
        # Arrêter tous les processus Git en cours d'exécution
        pkill -f git

        # Désinstaller Git
        sudo apt-get purge -y git

        # Supprimer les fichiers de configuration et de données
        sudo rm -rf ~/.gitconfig
    fi
else
    echo -e "${RED}git n'est pas installé.${NC}"
fi

sudo apt autoremove -y
sudo apt autoclean -y

echo -e "${GREEN}Désinstallation terminée${NC}"
echo -e "${GREEN}Merci d'avoir utilisé Opsian.${NC}"