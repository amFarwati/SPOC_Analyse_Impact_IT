import Papa from 'papaparse';
import { promises as fsPromises } from 'fs';

//fonction conversion CSV en JSON
async function formatSurv(csvFilePath,pathExit) {
    try {
        // Read the CSV file
        const csvData = await fsPromises.readFile(csvFilePath, 'utf8');
  
        // Parse CSV to JSON
        const parseResult = await new Promise((resolve, reject) => {
            Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
                comments: "#",
                complete: (results) => {
                    const headers = results.meta.fields;
                    // Afficher les headers
                    console.log('Liste des headers:', headers);
                    rowFormater(results.data,pathExit,headers)
                    resolve(console.log('ok'));
                },
                error: (error) => {
                    reject(error.message);
                },
            });
        });
  
        return parseResult;
    } catch (error) {
        throw new Error(`Error converting CSV to JSON: ${error.message}`);
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateRandomDate(startDate) {
    
    if (startDate === NaN){
        return NaN;
    }
    const res = startDate + getRandomInt(3 , 10 );
  
    return res;
  }

  function containsInteger(str) {
    return !isNaN(parseInt(str, 10)) && isFinite(parseInt(str, 10));
  }

  function rowFormater (data,pathExit,headers){
    const newRows = [];

    data.forEach(row =>{
        
        if (row['Disposez vous d\'un ordinateur portable personnel ?'] === 'Oui'){
            const computerRow = {
                id: row['ID de la réponse']+'1',
                date_debut: (row[headers[29]] === 'Autre'? ((containsInteger(row[headers[30]])) === false? NaN:row[headers[30]]):row[headers[29]]),
                date_fin: generateRandomDate(row[(row[headers[29]] ==='Autre'? ((containsInteger(row[headers[30]])) === false? NaN:headers[30]):headers[29])]),
                type: 'PC',
                os:row[(row[headers[16]] === "Autre"? headers[17]:headers[16])],
                ram:row[(row[headers[31]] === "Autre"? headers[32]:headers[31])],
                stockage:row[headers[33]],
                cpu:row['Quel est le type de CPU de votre ordinateur portable ?'],
                gpu:''
              };

              if(row["Votre ordinateur portable embarque-t-il une carte graphique (autre que l'APU intégré à son CPU) ?"]!==''){
                computerRow.gpu = row['Précisez le type de Carte Graphique (AMD RX-xxxx , Nvidia GTX-xxxx / Quadro - xxx, ...) :'];
                computerRow.type = 'PC-G'
              }
              newRows.push(computerRow);
        }

        if (row[headers[37]] === 'Oui'){
            const smartphoneRow = {
                id: row['ID de la réponse']+'2',
                date_debut: (row[headers[40]] === 'Autre'? ((containsInteger(row[headers[41]])) === false? NaN:row[headers[41]]):row[headers[40]]),
                date_fin: generateRandomDate(row[(row[headers[40]] ==='Autre'? ((containsInteger(row[headers[41]])) === false? NaN:headers[41]):headers[40])]),
                type: 'SMTP',
                os:row[(row[headers[38]] === "Autre"? headers[39]:headers[38])],
                ram:'',
                stockage:'',
                cpu:'',
                gpu:''
              };

              newRows.push(smartphoneRow);
        }
    })
    const csvOutput = Papa.unparse(newRows, {
        header: true,
        delimiter: ',',
      });
  
      // Écrire le nouveau CSV dans un fichier
      fsPromises.writeFile(pathExit, csvOutput, 'utf8')
      .then(() => {
        console.log('File successfully written!');
      })
      .catch((err) => {
        console.error('Error writing file:', err);
      });
      
      console.log('Le nouveau fichier CSV a été créé avec succès.');
  }

  // Assurez-vous d'inclure la bibliothèque papaparse dans votre projet



  const folderPath= '../data_test/';
  const file = 'results-survey452394.csv';

  //formatSurv(`${folderPath}${file}`,`${folderPath}result_survey_treated.csv`)