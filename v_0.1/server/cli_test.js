#!/usr/bin/env node

import { promises as fsPromises } from 'fs';
import yargs from 'yargs';
import Papa from 'papaparse';
import { hideBin } from 'yargs/helpers';
import got from 'got';


const argv = yargs(hideBin(process.argv)) // Analyse des paramètres
  .command('setInventory <user> <inventoryPath>', 'Set l\'inventaire de <user> dans la BD en exportant le fichier <inventory>.csv')
  .command('getInventory <user>', 'Récupère l\'inventaire de <user> stocké dans la BD')
  .command('getImpact <user>', 'Calcule et récupère l\'impact de <user>')
  .option('url', {
    alias: 'u',
    default: 'http://localhost',
    description: 'Url du serveur à contacter'
  })
  .option('port', {
    alias: 'p',
    default: '4000',
    description: 'port à utiliser'
  })
  .option('bot', {
    alias: 'b',
    default: false,
    description: 'désactive les messages utilisateur'
  })
  .demandCommand(1, 'Vous devez indiquer une commande')
  .help()
  .argv

function info (msg) {
  if (!argv.bot) {
    console.info(msg)
  }
}

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

const baseUrl = `${argv.url}:${argv.port}`

async function handleResponse (request) {
  try {
    const { body } = await request
    info(body)
  } catch (error) {
    console.error('ERROR:', error)
  }
}

switch (argv._[0]) {
  case 'getInventory':
    info(`getInventory ${argv.user} =>`)

    await handleResponse(
        got(`${baseUrl}/getInventory/${argv.user}`)
    )
    break

  case 'getImpact':
    info(`getImpact ${argv.user} =>`)

    await handleResponse(
        got(`${baseUrl}/getImpact/${argv.user}`)
    )
    break

  case 'setInventory':
    info(`setInventory ${argv.user} ${argv.inventoryPath} =>`)
    
    let inventoryAsJson = null;
    
    await convertCsvToJson(argv.inventoryPath)
            .then((msg) => {
                inventoryAsJson = msg;
            })
            .catch((error) => {
                console.error(`Error converting CSV to JSON: ${error}`);
            });
    
    if(inventoryAsJson === null){
        break;
    }

    await handleResponse(
        got.put({
            url: `${baseUrl}/setInventory`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: argv.user,
                inventory: inventoryAsJson
                })
        })
    )
    break
/*
  case 'keys':
    info(`Commande keys =>`)

    await handleResponse(got(`${baseUrl}/keys`))
    break
  case 'lookup':
    info(`lookup ${argv.key} =>`)

    await handleResponse(got(`${baseUrl}/lookup/${argv.key}`))
    break

  case 'add':
    info(`add ${argv.nodeUrl} =>`)

    await handleResponse(got.post({
      url: `${baseUrl}/add`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: argv.nodeUrl })
    }))
    break

  case 'join':
    info(`join ${argv.nodeUrl} =>`)

    await handleResponse(got.post({
      url: `${baseUrl}/join`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: argv.nodeUrl })
    }))
    break

  case 'config':
    info(`config ${argv.key} =>`)

    await handleResponse(got(`${baseUrl}/config/${argv.key}`))
*/
    break
  default:
    console.error('Commande inconnue')
}
