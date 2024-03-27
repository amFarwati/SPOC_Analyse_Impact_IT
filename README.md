[Opsian]: http://opsian.insa-lyon.fr/

# Opsian

Opsian, pour _OPen Source Impact ANalyzer_, est une solution d'analyse d'impact IT qui permet aux utilisateurs d'avoir une idée de leur **impact environnemental** concernant leur **parc informatique**.

## Table des Matières

- [Opsian](#opsian)
  - [Table des Matières](#table-des-matières)
  - [Installation](#installation)
    - [En local](#en-local)
    - [Avec Docker](#avec-docker)
  - [Utilisation](#utilisation)
  - [Contexte](#contexte)
    - [Qui sommes nous ?](#qui-sommes-nous-)
    - [La Ruche Industrielle](#la-ruche-industrielle)
    - [NumEcoEval](#numecoeval)
  - [Ce qui est fait](#ce-qui-est-fait)
  - [La suite...](#la-suite)
  - [Liens utiles](#liens-utiles)

## Installation

Prérequis : avoir une distribution Linux ou un environnement similaire.

1. Installer git et cloner le repository

```bash
sudo apt update
# Installation de git
if ! command -v git &> /dev/null
then
    echo "Git n'est pas installé. Installation en cours..."
    sudo apt install -y git
else
    echo "Git est déjà installé."
fi


git clone https://github.com/amFarwati/SPOC_Analyse_Impact_IT.git
```

2. Se déplacer dans le dossier

```bash
cd <votre_chemin>/Github/SPOC_Analyse_Impact_IT
```

### En local

3. Lancer le script d'installation

```bash
./installation.sh
```

L'installation et la mise en place de l'outil risquent de prendre quelques minutes.
Pour finir vous pouvez lancer le script de lancement pour démarrer le projet :

```bash
./lancement_local.sh
```

### Avec Docker

Prérequis : installer Docker. Vous pouvez trouver comment faire via ce lien : [**Installer Docker**](https://larucheindustrielle.fr/fr/)  
Cela peut changer en fonction de votre système d'exploitation.

3. Lancer le script de démarrage correspondant à docker

```bash
./lancement_docker.sh
```

De la même manière, le téléchargement des images et le montage des conteneurs risquent de prendre du temps. Une fois que les conteneurs sont montés, la base de données doit s'initialiser ce qui prend encore du temps.
Au total tout devrait être opérationnel en 8min.

Vous pourrez accéder à l'outil sur le port 3000 de votre machine.

## Utilisation

Il faut se connecter au Wi-Fi ou au VPN de l'INSA Lyon pour accéder à l'outil en ligne. Sinon, veuillez procéder à l'installation de l'outil vu à l'étape précédente.

Se rendre sur :

> [**opsian.insa-lyon.fr**][Opsian]

- Choisir à la main ses Items pour calculer leur impact

ou

- Importer un fichier .csv avec ses appareils pour que l'outil le calcul tout seul. Des templates sont disponibles dans ./Données_test/Donnees_utilisables
- Admirer le résultat

## Contexte

### Qui sommes nous ?

Nous sommes deux étudiants de l'**INSA Lyon**, spécialité **Télécommunications Services & usages**. Pendant nos études, avons pu faire un projet en partenariat avec une entreprise pour concevoir une _Sustainable Proof Of Concept_ ou SPOC.

C'est Hugues Benoit-Cattin, notre référent à l'INSA et à La Riche Industrielle, qui nous a présenté les objectifs que devait atteindre notre analyseur d'impact informatique.

<div class="container" style="display:flex; text-align:center;justify-content: center;">
    <div style="padding: 20px;">
        <img src="./images/Maxime.JPG" alt="Maxime" height="150">
        <p>Maxime Herry<br>Développeur</p>
    </div >
    <div style="padding: 20px;">
        <img src="./images/Arthur.jpg" alt="Arthur" height="150">
        <p>Arthur-Mustapha Farwati<br>Développeur</p>
    </div>
    <div class="container" style="text-align:center;justify-content: center; padding: 20px;">
        <img src="./images/HBC.jpg" alt="Hugues Benoit-Cattin" height="150">
        <p>Hugues Benoit-Cattin<br>Référent</p>
    </div>
</div>

<div class="container" style="display:flex; text-align:center;justify-content: center;">
    <div style="padding: 20px;">
        <img src="./images/INSA.png" alt="INSA" height="50">
    </div >
    <div style="padding: 20px;">
        <img src="./images/Ruche.png" alt="Ruche" height="50">
    </div>
</div>

### La Ruche Industrielle

Association Loi 1901, [**La Ruche Industrielle**](https://larucheindustrielle.fr/fr/) est un collectif de _17 membres_ composé de _13 entreprises industrielles_ de différents secteurs, d'_une institution_ et de _trois grandes écoles_ qui se rassemblent pour accélérer leur transformation.

Pour permettre la collaboration entre les adhérents, un cadre a été posé : un lieu physique implanté au cœur du site USIN, site totem de l'industrie de demain.

### NumEcoEval

[**NumEcoEval**](https://ecoresponsable.numerique.gouv.fr/publications/boite-outils/fiches/numecoeval/) est une solution permettant de calculer l'empreinte environnementale d'un système d'information.
Le système d'information est défini comme l'ensemble des équipements physiques, des machines virtuelles et des applications gérés par une organisation.

Il suit les principes décrit dans la RCP Service Numérique et préfigure l'outillage qui pourrait être associé à une RCP « Système d'Information » qui est en cours d'élaboration par l'écosystème.

Objectifs :

- Mesurer l'impact de chaque composante du parc informatique et des services numériques d'une structure
  \*Suivre l'évolution des impacts dans le temps
- Réaliser des simulations pour évaluer l'impact d'une décision

**Auteur :** Ministère de la Transition Écologique et de la Cohésion des Territoires

**Technologie principale :** Java

**Licence :** Apache

## Ce qui est fait

- Mise en place d'un front, d'un back et d'une base de donnée
- Preuve de concept finalisée
- Déploiement du projet sur une machine virtuelle de l'INSA
- Service de login avec gestion d'utilisateurs
- Sécurisation du site avec https
- dockerization du projet

## La suite...

- Avoir des retours utilisateurs pour modifier l'outil en conséquences
- Rendre l'outil plus pro pour aller au delà de la Proof Of Concept

## Liens utiles

- Opsian : [opsian.insa-lyon.fr][Opsian]
- La Ruche Industrielle : [https://larucheindustrielle.fr/fr](https://larucheindustrielle.fr/fr/)
- NumEcoEval : [https://ecoresponsable.numerique.gouv.fr/publications/boite-outils/fiches/numecoeval](https://ecoresponsable.numerique.gouv.fr/publications/boite-outils/fiches/numecoeval/)
