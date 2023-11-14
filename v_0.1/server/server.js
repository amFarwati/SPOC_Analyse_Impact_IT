const express = require("express");
const csvtojson = require('csvtojson');
const fs = require('fs');
const cors=require("cors");

const app = express();

const corsOptions ={
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}

const PORT = 5000;
const csvFilePath = './BD.csv';

async function updateBd(pathCsv,res){
  csvtojson()
  .fromFile(pathCsv)
  .then(([jsonObj]) => {
   console.log(jsonObj);
   res.json(jsonObj);
  })
  .catch((err) => {
    console.error('Erreur lors de la conversion :', err);
  });
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.get("/getCostBd", (req, res)  => {
    updateBd(csvFilePath, res);
})

app.listen(PORT, () => { console.log(`Server stated on PORT ${PORT}`)});