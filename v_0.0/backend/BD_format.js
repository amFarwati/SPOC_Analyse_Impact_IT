const csvFilePath = './BD.csv'; // Remplacez ceci par le chemin vers votre fichier CSV
const jsonFilePath = './BD.json'; // Remplacez ceci par le chemin où vous souhaitez enregistrer le fichier JSON

const csvtojson = require('csvtojson');
const fs = require('fs');

async function updateBdJson(pathCsv,pathJson){
  csvtojson()
  .fromFile(pathCsv)
  .then((jsonObj) => {
    const jsonData = JSON.stringify(jsonObj, null, 2);
    console.log(jsonData);
    fs.writeFile(pathJson, jsonData, (err) => {
      if (err) throw err;
      console.log('Conversion du fichier CSV en JSON terminée!');
    });
  })
  .catch((err) => {
    console.error('Erreur lors de la conversion :', err);
  });
}







  
