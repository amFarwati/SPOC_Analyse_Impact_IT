echo "Création de la BD"
cd Input_SQL_data/
mysql -u root -p opsian -e "
source SetUp_BD_OPSIAN.sql;
source Critere_M.sql;
source EtapeACV_M.sql;
source NomComposant_M.sql;
source Source_M.sql;
source Type_M.sql;
source Composant_M.sql;
source Reference_M.sql;"