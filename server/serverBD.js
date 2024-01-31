import mysql from 'mysql';
import fs from 'fs';
import Papa from 'papaparse'

const correspondanceRefEquipementPath = 'v_0.1/data_test/NumEcoEval/correspondanceRefEquipement.csv';
const criteresPath = 'v_0.1/data_test/NumEcoEval/criteres.csv';
const etapesPath = 'v_0.1/data_test/NumEcoEval/etapes.csv';
const hypothesesPath = 'v_0.1/data_test/NumEcoEval/hypotheses.csv';
const impactequipementsPath = 'v_0.1/data_test/NumEcoEval/impactequipements.csv';
const impactreseauxPath = 'v_0.1/data_test/NumEcoEval/impactreseaux.csv';
const mixelecsPath = 'v_0.1/data_test/NumEcoEval/mixelecs.csv';
const typeEquipementPath = 'v_0.1/data_test/NumEcoEval/typeEquipement.csv';

const champsCriteres = "idCritere, critere, description, unite"
const champsEtapes = "idEtapeACV,etapeACV"
const champsReferences = "idReference,nomReference

function normalisationCriteres(tableau2D) {
    tableau2D.map(function (ligne) {
    // Retourne une nouvelle ligne sans la dernière colonne
    return ligne.slice(0, -1);  // Parcourir chaque ligne du tableau
  });
  tableau2D.slice(0, -1); 
  for (let i = 0; i < tableau2D.length; i++) {
    // Parcourir chaque élément de la ligne
    for (let j = 0; j < tableau2D[i].length; j++) {
      tableau2D[i][j] = "'"+tableau2D[i][j].replace(/'/g, "''") + "'";
    }
  }
  return(tableau2D);
}

function normalisationEtapes(tableau2D) {
  tableau2D.map(function (ligne) {
    // Retourne une nouvelle ligne sans la première colonne
    return ligne.slice(1,-1);  // Parcourir chaque ligne du tableau
  }); 
  tableau2D.slice(0, -1);  
  for (let i = 0; i < tableau2D.length; i++) {
    // Parcourir chaque élément de la ligne
    for (let j = 0; j < tableau2D[i].length; j++) {
      tableau2D[i][j] = "'"+tableau2D[i][j].replace(/'/g, "''") + "'";
    }
  }
  return(tableau2D);
}
function csvToArray(filePath){
  const contenuCSV = fs.readFileSync(filePath, 'utf8');
  const result = Papa.parse(contenuCSV, { header: false });
  return result.data;
}

function ajoutTable(nomTable,nom,champs,ideb=1,jdeb=0,ifin=nomTable.length,jfin=nomTable[0].length){
  var ajout = ""
  for(let i = ideb; i <=ifin; i++){
    ajout +="("+i;
    for (let j = jdeb;j<=jfin;j++){
      ajout +=","+nomTable[i][j];
    }
    ajout +="),";
  }
  ajout = ajout.slice(0, -1);

  db.query("insert into "+nom+" ("+champs+") values "+ajout+";", function (err, result) {       
    if (err) throw err;       
    console.log(result);     
  });
  
}


const db = mysql.createConnection({
  host: "localhost",   
  user: "root",   
  password: "Max@mysql05082503",
  database: "spoc_analyse_impact_it" 
});

db.connect(function(err) {   
  if (err) throw err;   
  console.log("Connecté à la base de données MySQL!"); 
});


// const criteres = normalisationCriteres(csvToArray(criteresPath));
// ajoutTable(criteres,"critere",champsCriteres);

// const etapes = normalisationEtapes(csvToArray(etapesPath));
// ajoutTable(etapes,"etapeacv",champsEtapes,1,1,4,1);

const references = normalisationReferences(csvToArray(correspondanceRefEquipementPath));
ajoutTable(references,"reference",champsReferences,1,1,4,1);

db.end();