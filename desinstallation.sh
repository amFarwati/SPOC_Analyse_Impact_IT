echo "Désinstallation en cours"

sudo apt update
# Désinstallation de Node.js et npm
if command -v node &> /dev/null
then
    # Vérifier si Node.js était déjà installé
    last_line=$(tail -n 2 installation.log | head -n 1)
    if [[ $last_line == *"Node.js est déjà installé."* ]]; then
        echo "Attention : Node.js était déjà installé avant l'installation du projet."
    fi
    echo "Node.js est installé. Voulez-vous le désinstaller ? (y/n)"
    read answer
    if [[ "$answer" =~ ^[Yy]es?$ ]]; then
        sudo apt purge -y nodejs npm
    fi
else
    echo "Node.js n'est pas installé."
fi

# Désinstallation de MySQL
if command -v mysql &> /dev/null
then
    # Vérifier si Node.js était déjà installé
    last_line=$(tail -n 2 installation.log | head -n 1)
    if [[ $last_line == *"MySQL est déjà installé."* ]]; then
        echo "Attention : MySQL était déjà installé avant l'installation du projet."
    fi
    echo "MySQL est installé. Voulez-vous le désinstaller ? (y/n)"
    read answer
    if [[ "$answer" =~ ^[Yy]es?$ ]]; then
        sudo apt purge -y mysql-server


    else 
        # Suppression de la base de données
        echo "Voulez-vous supprimer la base de données opsian ? (y/n)"
        read answer
        if [[ "$answer" =~ ^[Yy]es?$ ]]; then
            sudo mysql -u root -e "DROP DATABASE IF EXISTS opsian;"
        fi
    fi
else
    echo "MySQL n'est pas installé."
fi

# Suppression du projet cloné
if [ -d "SPOC_Analyse_Impact_IT" ]; then
    echo "Le projet cloné existe. Voulez-vous le supprimer ? (y/n)"
    read answer
    if [[ "$answer" =~ ^[Yy]es?$ ]]; then
        rm -rf SPOC_Analyse_Impact_IT
    fi
else
    echo "Le projet cloné n'existe pas."
fi

# Désinstallation de git
if command -v git &> /dev/null
then
    echo "Node.jgit est installé. Voulez-vous le désinstaller ? (y/n)"
    read answer
    if [[ "$answer" =~ ^[Yy]es?$ ]]; then
        sudo apt purge -y git
    fi
else
    echo "git n'est pas installé."
fi

sudo apt autoremove -y
sudo apt autoclean -y

echo "Désinstallation terminée"