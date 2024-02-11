echo "Reformatage des données de NumEcoEval....."
cd Input_SQL_data/
mysql -u root -p opsian -e "
source Delete.sql;
source Critere_M.sql;
source EtapeACV_M.sql;
source NomComposant_M.sql;
source Source_M.sql;
source Type_M.sql;
source Composant_M.sql;
source Reference_M.sql;"