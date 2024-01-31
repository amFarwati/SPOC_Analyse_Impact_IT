import { promises as fsPromises } from 'fs';
import Papa from 'papaparse';

async function replaceIdsInComposantM(composantMFile, mappingFiles) {
  try {
    const composantMData = await readCSV(composantMFile);

    for (const mappingFile of mappingFiles) {
      const { columnName, idColumnName } = mappingFile;
      const mappingData = await readCSV(mappingFile.fileName);

      // Créer une carte de correspondance entre les valeurs de colonne et les IDs
      const idMap = new Map();
      mappingData.forEach(row => {
        idMap.set(row[columnName], row[idColumnName]);
      });

      // Remplacer les IDs dans Composant_M
      composantMData.forEach(row => {
        const value = row[columnName];
        if (idMap.has(value)) {
          row[columnName] = idMap.get(value);
        }
      });
    }

    // Écrire le résultat dans un nouveau fichier CSV
    await writeCSV('/home/amfarwati/Documents/Server SPOC SQL/Composant_M.csv', composantMData);
    console.log('Opération terminée avec succès');
  } catch (error) {
    console.error('Erreur :', error);
  }
}

async function readCSV(fileName) {
  try {
    const fileData = await fsPromises.readFile(fileName, 'utf-8');

    return new Promise((resolve, reject) => {
      Papa.parse(fileData, {
        header: true,
        skipEmptyLines: true,
        complete: result => {
          resolve(result.data);
        },
        error: error => {
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error('Error reading CSV:', error);
    throw error;
  }
}

async function writeCSV(fileName, data) {
  try {
    const csvData = Papa.unparse(data);
    await fsPromises.writeFile(fileName, csvData, 'utf-8');
  } catch (error) {
    console.error('Error writing CSV:', error);
    throw error;
  }
}

// Exemple d'utilisation
const folderMap = '/home/amfarwati/Documents/Server SPOC SQL';
const composantMFile = `${folderMap}/Composant_M_Source.csv`;

const mappingFiles = [
  { fileName: `${folderMap}/Critere_M.csv`, columnName: 'critere', idColumnName: 'idCritere' },
  { fileName: `${folderMap}/EtapeACV_M.csv`, columnName: 'etapeACV', idColumnName: 'idEtapeACV' },
  { fileName: `${folderMap}/Type_M.csv`, columnName: 'type', idColumnName: 'idType' },
  { fileName: `${folderMap}/Source_M.csv`, columnName: 'source', idColumnName: 'idSource' },
  { fileName: `${folderMap}/NomComposant_M.csv`, columnName: 'nomComposant', idColumnName: 'idComposant' },
];

replaceIdsInComposantM(composantMFile, mappingFiles);
