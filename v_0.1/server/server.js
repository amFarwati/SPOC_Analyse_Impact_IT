#!/usr/bin/env node
import mysql from 'mysql';
import express from 'express'
import bodyParser from 'body-parser'
import Papa from 'papaparse';
import yargs from 'yargs'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import 'dayjs/locale/fr.js';
import { promises as fsPromises } from 'fs';
import { hideBin } from 'yargs/helpers';


const argv = yargs(hideBin(process.argv))
  .options({
    port: {
      description: "Port d'écoute du serveur",
      alias: 'p',
      default: 4000,
    },
  })
  .parse()
  
dayjs.locale('fr');
dayjs.extend(customParseFormat)
  
const app = express();
const port = argv.port;
var liste_reference = null;

const OPSIAN_db = mysql.createConnection({
  host: "localhost",   
  user: "root",   
  password: "spocBDD",
  database: "opsian" 
});

OPSIAN_db.connect(function(err) {   
  if (err) throw err;   
  console.log("Connecté à la base de données MySQL OPSIAN!"); 
});

const db = {
  test: "hello world",
}

var db_modele = null;

//fonction conversion CSV en JSON
async function convertCsvToJson(csvFilePath) {
  try {
      // Read the CSV file
      const csvData = await fsPromises.readFile(csvFilePath, 'utf8');

      // Parse CSV to JSON
      const parseResult = await new Promise((resolve, reject) => {
          Papa.parse(csvData, {
              header: true, // Assumes the first row contains headers
              skipEmptyLines: true,
              complete: (result) => {
                  resolve(result.data);
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

//fonction conversion string en array de int
function stringToArray(inputString) {
  // Utilisez la méthode split pour diviser la chaîne en fonction du point-virgule
  var stringArray = inputString.split(';');

  var numberArray = stringArray.map(function (str) {
      return parseInt(str, 10);
  });

  return numberArray;
}

//fonction conversion inventaire (format Json) en dictionnaire (key;value (int))
function bdFormat_User(jsonContent){
  let itemList = jsonContent;
  console.log(itemList);
  itemList.forEach((item)=>{
    item.quantity = parseInt(item.quantity);
  });
  return itemList;
};

//fonction conversion modéle (format Json) en dictionnaire (key;value (int))
function bdFormat_Model(jsonContent){
  let modelDict = {};
  let keyList = Object.keys(jsonContent[0]);

  keyList.forEach((key)=>{
    modelDict[key.split('.')[1]] = stringToArray(jsonContent[0][key]);
  })

  return modelDict;
};

function toMySQLDateFormat(date){
  date = dayjs(date);
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

//async fonction requêtage BD (interface serveur/BD modéle) => faire getUserInv
function bdRequest(request,data) {
  console.log(`starting bd request ${request}`);

  return new Promise((resolve) => {
    switch (request) {
      case 'getUserImpact':// OK

        setTimeout(() => {

          let idPush = null;
          let user = data.user;
          let userInv = null;
          let etapeACV = null;
          let critere = null;
          let unite = null;
          let impactItem = {};
          let promises = [];

          promises.push(new Promise((resolve, reject) => {OPSIAN_db.query(`SELECT MAX(idPush) FROM Push_U WHERE idUser = (SELECT idUser FROM User_U WHERE user = '${user}');`, (err, result) => {       
            if (err) throw err;       
            idPush = result[0]['MAX(idPush)'];
            resolve();
          })}));

          promises.push(new Promise((resolve, reject) => {OPSIAN_db.query(`SELECT unite FROM Critere_M;`, (err, result) => {       
            if (err) throw err;       
            unite = result.map(row => row.unite);
            resolve();
          })}));

          promises.push(new Promise((resolve, reject) => {OPSIAN_db.query(`SELECT idCritere FROM Critere_M;`, (err, result) => {       
            if (err) throw err;       
            critere = result.map(row => row.idCritere);
            resolve();
          })}));

          promises.push(new Promise((resolve, reject) => {OPSIAN_db.query(`SELECT idEtapeACV FROM EtapeACV_M;`, (err, result) => {       
            if (err) throw err;       
            etapeACV = result.map(row => row.idEtapeACV);
            resolve();
          })}));

          Promise.all(promises)
          .then(()=>{
            promises = [];
            promises.push(new Promise((resolve, reject) => {OPSIAN_db.query(`SELECT idItem FROM Item_U WHERE idPush = ${idPush};`, (err, result) => {       
              if (err) throw err;       
              userInv = result.map(row => row.idItem);
              resolve();
            })}));

            Promise.all(promises)
            .then(()=> {
              userInv.forEach(idItem => {
                impactItem[idItem]={};

                etapeACV.forEach(idEtapeACV => {
                  impactItem[idItem][idEtapeACV]={};
                  critere.forEach(idCritere => {
                    promises.push(new Promise((resolve, reject) => {
                      OPSIAN_db.query(`SELECT SUM(valeur) FROM Composant_M WHERE idCritere = ${idCritere} AND idEtapeACV = ${idEtapeACV}  AND idType = (SELECT idType From Reference_M WHERE idReference = (SELECT idReference FROM Item_U WHERE idItem = ${idItem}));`, (err, result) => {       
                        if (err) {
                          reject(err);
                        } else {
                          result.map(row => {
                            impactItem[idItem][idEtapeACV][idCritere] = {cout: row['SUM(valeur)']};
                            resolve();
                          });
                        }
                      });
                    }));
                  });
                });
              });
      
              Promise.all(promises)
              .then(results => {
                // Traiter les résultats ici
                resolve([impactItem,unite]);
                console.log(`bd request ${request} ${data.user} awsered`);
              }) 
              .catch(error => {
                // Gérer les erreurs ici
                console.error('Une erreur s\'est produite :', error);
              });
            })
          })
          .catch(error => {
            // Gérer les erreurs ici
            console.error('Une erreur s\'est produite :', error);
          });
  
        },
        1000);

        break;
      case 'getType':// OK
        setTimeout(() => {
          let refList = [];

          OPSIAN_db.query("SELECT nomReference FROM Reference_M;", (err, result) => {       
            if (err) throw err;       
            console.log(result);
            refList = result.map(row => row.nomReference);
            resolve(refList);
          })

          console.log(`bd request ${request} awsered`);
        },
        1000);
        break;
      case 'getUser':// OK
        setTimeout(() => {
          let userList = [];

          OPSIAN_db.query("SELECT user FROM User_U;", (err, result) => {       
            if (err) throw err;       
            console.log(result);
            userList = result.map(row => row.user);
            resolve(userList);
          })
          console.log(`bd request ${request} awsered`);
        },
        1000);
        break;
      case 'setUser':// OK
        setTimeout(() => {
          console.log(data.user)
          OPSIAN_db.query(`INSERT INTO User_U SET user = "${data.user}";`, (err, result) => {       
            if (err) throw err;       
            console.log(`=> SET user = ${data.user} OK`);
            resolve(true);
          })

          console.log(`bd request ${request} awsered`);
        },
        1000);
        break;
      case 'setUserPush':// OK
        setTimeout(() => {

          OPSIAN_db.query(`INSERT INTO Push_U (date, idUser) VALUES ('${data.date}', (SELECT idUser FROM User_U WHERE user = '${data.user}'))`, (err, result) => {       
            if (err) throw err;       
            console.log(`=> SET userPush = ${data.user}, ${data.date}  OK`);
            resolve(true);
          })

          console.log(`bd request ${request} awsered`);
        },
        1000);
        break;3
      case 'setUserInv': // OK
        setTimeout(() => {
          data.inv.forEach((item)=> {
            let ref = item.type;
            let dateAchat = item.dateDebut ;
            
            if (liste_reference.includes(ref)){
              for (let i = 0; i < item.quantity;i++){

                OPSIAN_db.query(`INSERT INTO Item_U (dateDebut, idPush, idReference, nomReference)VALUES ('${dateAchat}',(SELECT idPush FROM Push_U WHERE idUser = (SELECT idUser FROM User_U WHERE user = '${data.user}') AND date = (SELECT MAX(date) FROM Push_U WHERE idUser = (SELECT idUser FROM User_U WHERE user = '${data.user}'))),(SELECT idReference FROM Reference_M WHERE nomReference = '${ref}'),'${ref}');`
                  , (err, result) => {       
                  if (err) throw err;       
                  console.log(`=> SET userInv = ${data.user}  OK`);
                  resolve(true);
                })
              }
            }else{
              for (let i = 0; i < item.quantity;i++){

                OPSIAN_db.query(`INSERT INTO Item_U (dateDebut, idPush, idReference, nomReference)VALUES ('${dateAchat}',(SELECT idPush FROM Push_U WHERE idUser = (SELECT idUser FROM User_U WHERE user = '${data.user}') AND date = (SELECT MAX(date) FROM Push_U WHERE idUser = (SELECT idUser FROM User_U WHERE user = '${data.user}'))),(SELECT idReference FROM Reference_M WHERE nomReference = 'default'),'${ref}');`
                  , (err, result) => {       
                  if (err) throw err;       
                  console.log(`=> SET userInv = ${data.user}  OK`);
                  resolve(true);
                })
              }
            }

          })

          console.log(`bd request ${request} awsered`);
        },
        1000);
        break;
      case 'getUserInv': // a faire + TEST
        break;
    }
  });
}


// Middleware pour activer CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//requête setInventory (fini)
app.put('/setInventory', async (req, res) => {
  try {
    console.log(`setInventory for ${req.body.user}`);

    let user = req.body.user;
    let inv = req.body.inventory;
    let userList = await bdRequest('getUser')

    if(!(userList.includes(user))){
      await bdRequest('setUser',{user: user});
    }
    await bdRequest('setUserPush', {user: user, date: toMySQLDateFormat(dayjs())});
    liste_reference = await bdRequest('getType');
    await bdRequest('setUserInv',{user: user, inv: inv});

    res.send(`BD updated with data for ${req.body.user}`);
  } catch (error) {
    console.error(`Error setting user inventory: ${error}`);
    res.status(500).send('ERROR: The server encountered difficulties getting the type list');
  }
})

//requête getInventory (fini) => a changer avec SQL + TEST
app.get('/getInventory/:user', (req, res) => {
        console.log(`getInventory for ${req.params.user}`);

        if(req.params.user===undefined){
          res.send(`ERROR: the user is undefined`);
        }else if (req.params.user in db){
          res.json(db[req.params.user]);
        }else{
          res.send(`ERROR: the user ${req.params.user} has not been found in the BD`);
        }
})

//requête getImpact (fini) (fini)
app.get('/getImpact/:user', async (req, res) => {
        let user = req.params.user;
        console.log(`getImpact for ${user}`);

        let userList = await bdRequest('getUser')

        if(user===undefined){
          res.send(`ERROR: the user is undefined`);
        }else if (userList.includes(user)){
          bdRequest('getUserImpact', {user : user})
          .then((result)=>{
            console.log(result)

            let cost = {
              FABRICATION : [0,0,0,0,0],
              DISTRIBUTION : [0,0,0,0,0],
              UTILISATION : [0,0,0,0,0],
              FIN_DE_VIE : [0,0,0,0,0]
            }
            
            let itemList = Object.keys(result[0]);
            let etapeACVList = Object.keys(result[0][itemList[0]]);
            let critereList = Object.keys(result[0][itemList[0]][etapeACVList[0]]);
            let resEtapeACVList = Object.keys(cost);

            itemList.forEach(item => {
              for (let i = 0; i < etapeACVList.length; i++){
                for (let j = 0; j < critereList.length; j++){
                  cost[resEtapeACVList[i]][j] += result[0][item][etapeACVList[i]][critereList[j]].cout; 
                }
              }           
            })
            res.json([cost,result[1]])
          })
          .catch((error)=>{console.error(`Error computing Impact: ${error}`);
          res.send(`ERROR: the server encountimpactItemer dificulties during computing impact`)})
        }else{
          res.send(`ERROR: the user ${user} has not been found in the BD`);
        }
})

//requête getTypeList (fini)
app.get('/getTypeList', async (req, res) => {
  try {
    console.log('getTypeList');
    liste_reference = await bdRequest('getType');
    console.log(liste_reference);
    res.json(liste_reference);
  } catch (error) {
    console.error(`Error getting type list: ${error}`);
    res.status(500).send('ERROR: The server encountered difficulties getting the type list');
  }
});

console.log(`Server try run on port ${port}`)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})