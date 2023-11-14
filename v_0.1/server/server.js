#!/usr/bin/env node

import express from 'express'
import bodyParser from 'body-parser'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import got from 'got'


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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.put('/setInventory', (req, res)  => {
        console.log(`setInventory for ${req.body.user}`);

        db[req.body.user] = req.body.inventory;
        res.send(`BD updated with data for ${req.body.user}`);
})

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

app.get('/getImpact/:user', (req, res) => {
        console.log(`getImpact for ${req.params.user}`);

        if(req.params.user===undefined){
          res.send(`ERROR: the user is undefined`);
        }else if (req.params.user in db){
          res.json('compute');
        }else{
          res.send(`ERROR: the user ${req.params.user} has not been found in the BD`);
        }
})

/*
app.post("/", (req, res) => {

})
*/

console.log(`Server try run on port ${port}`)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})