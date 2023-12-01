#!/usr/bin/env node
import express from 'express'
import bodyParser from 'body-parser'
import Papa from 'papaparse';
import yargs from 'yargs'
import { promises as fsPromises } from 'fs';
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv))
  .options({
    port: {
      description: "Port d'écoute du serveur",
      alias: 'p',
      default: 4000,
    },
  })
  .parse()

const app = express();

const port = argv.port;
const csvFilePath = './BD.csv';

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

//async fonction requêtage BD (interface serveur/BD modéle)
function bdRequest(request,data) {
  console.log(`starting bd request ${request}`);

  return new Promise((resolve) => {
    switch (request) {
      case 'user':
        // à changer quand passage au serv SQL
        /*---------------------------------------------------------------------------*/
        setTimeout(() => {

          let totalCost = [0,0,0];
          
          db[data].forEach((tuple)=>{
            for (let i = 0; i < totalCost.length; i++){
              totalCost[i] += db_modele[tuple.type][i]*tuple.quantity;
            }
          }); 
          
          resolve(totalCost);
          console.log(`bd request ${request} ${data} awsered`);
        },
        /*----------------------------------------------------------------------------------*/
        1000);
        /*---------------------------------------------------------------------------*/
        break;
      case 'type':
        // à changer quand passage au serv SQL
        /*---------------------------------------------------------------------------*/
        setTimeout(() => {
          let typeList = Object.keys(db_modele);
          resolve(typeList);
          console.log(`bd request ${request} awsered`);
        },
        1000);
        /*---------------------------------------------------------------------------*/
        break;
    }
  });
}

//async fonction calcul impact pour un User
async function impactUser(user) {
  return await bdRequest('user', user);
}

//async fonction retourne la liste de Types de la bd
async function typeList() {
  return await bdRequest('type');
}

// à changer quand passage au serv SQL (sera dans bdRequest)
/*---------------------------------------------------------------------------*/
await convertCsvToJson('./BD.csv')
.then((bd) => {
  db_modele = bdFormat_Model(bd);
  //console.log(`db_modele :`, db_modele);
})
.catch((error) => {
    console.error(`Error converting CSV to JSON: ${error}`);
});
/*---------------------------------------------------------------------------*/

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

//requête setInventory (fini) /!\ prend que des json deja traité [{type: string, quantity: string}]
app.put('/setInventory', (req, res)  => {
        console.log(`setInventory for ${req.body.user}`);

        db[req.body.user] = bdFormat_User(req.body.inventory);
        res.send(`BD updated with data for ${req.body.user}`);
})

//requête getInventory (fini) 
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

//requête getImpact (fini) /!\ prend que des json deja traité [{type: string, quantity: int},]
app.get('/getImpact/:user', (req, res) => {
        console.log(`getImpact for ${req.params.user}`);

        if(req.params.user===undefined){
          res.send(`ERROR: the user is undefined`);
        }else if (req.params.user in db){
          impactUser(req.params.user)
          .then((impact)=>{res.json(impact);})
          .catch((error)=>{console.error(`Error computing Impact: ${error}`);
          res.send(`ERROR: the server encounter dificulties during computing impact`)})
        }else{
          res.send(`ERROR: the user ${req.params.user} has not been found in the BD`);
        }
})

//requête getInventory (fini) 
app.get('/getTypeList', (req, res) => {
  console.log(`getTypeList`);
  typeList()
  .then((list)=> {res.json(list);})
  .catch((error)=> {console.error(`Error getting type list: ${error}`);
  res.send(`ERROR: the server encounter dificulties getting type list`)})
})

console.log(`Server try run on port ${port}`)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})