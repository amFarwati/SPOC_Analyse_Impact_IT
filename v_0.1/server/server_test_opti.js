#!/usr/bin/env node
import mysql from "mysql";
import express from "express";
import bodyParser from "body-parser";
import Papa from "papaparse";
import yargs from "yargs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import "dayjs/locale/fr.js";
import { promises as fsPromises } from "fs";
import { hideBin } from "yargs/helpers";

console.log("server test opti")

const argv = yargs(hideBin(process.argv))
  .options({
    port: {
      description: "Port d'écoute du serveur",
      alias: "p",
      default: 4000,
    },
  })
  .parse();

dayjs.locale("fr");
dayjs.extend(customParseFormat);

const app = express();
const port = argv.port;
var liste_reference = null;

const OPSIAN_db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "spocBDD",
  database: "opsian",
});

OPSIAN_db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL OPSIAN!");
});

var dateMin = null;
var dateMax = null;
var nbProps = null;
var nbPropsEnService = null;
var unite = null;

var db_modele = null;

//fonction conversion CSV en JSON
async function convertCsvToJson(csvFilePath) {
  try {
    // Read the CSV file
    const csvData = await fsPromises.readFile(csvFilePath, "utf8");

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
  var stringArray = inputString.split(";");

  var numberArray = stringArray.map(function (str) {
    return parseInt(str, 10);
  });

  return numberArray;
}

//fonction conversion inventaire (format Json) en dictionnaire (key;value (int))
function bdFormat_User(jsonContent) {
  let itemList = jsonContent;
  itemList.forEach((item) => {
    item.quantity = parseInt(item.quantity);
  });
  return itemList;
}

//fonction conversion modéle (format Json) en dictionnaire (key;value (int))
function bdFormat_Model(jsonContent) {
  let modelDict = {};
  let keyList = Object.keys(jsonContent[0]);

  keyList.forEach((key) => {
    modelDict[key.split(".")[1]] = stringToArray(jsonContent[0][key]);
  });

  return modelDict;
}

function toMySQLDateFormat(date) {
  date = dayjs(date);
  return date.toISOString().slice(0, 19).replace("T", " ");
}

//async fonction requêtage BD (interface serveur/BD modéle)
function bdRequest(request, data) {
  console.log(`starting bd request ${request}`);

  return new Promise((resolve) => {
    let timer = Date.now();

    switch (request) {
      case "getUserImpact": // à verif
        setTimeout(() => {
          let idPush = null;
          let user = data.user;
          let userInv = null;
          let etapeACV = null;
          let critere = null;
          let impactItem = {};
          let promises = [];

          promises.push(
            new Promise((resolve, reject) => {
              OPSIAN_db.query(
                `SELECT MAX(idPush) 
                FROM Push_U 
                JOIN User_U ON Push_U.idUser = User_U.idUser
                WHERE User_U.user = '${user}'
                ;`,
                (err, result) => {
                  if (err) throw err;
                  idPush = result[0]["MAX(idPush)"];
                  resolve();
                }
              );
            })
          );

          promises.push(
            new Promise((resolve, reject) => {
              OPSIAN_db.query(
                `SELECT unite 
                FROM Critere_M
                ;`
                , (err, result) => {
                if (err) throw err;
                unite = result.map((row) => row.unite);
                resolve();
              });
            })
          );

          promises.push(
            new Promise((resolve, reject) => {
              OPSIAN_db.query(
                `SELECT idCritere 
                FROM Critere_M
                ;`,
                (err, result) => {
                  if (err) throw err;
                  critere = result.map((row) => row.idCritere);
                  resolve();
                }
              );
            })
          );

          promises.push(
            new Promise((resolve, reject) => {
              OPSIAN_db.query(
                `SELECT idEtapeACV 
                FROM EtapeACV_M
                ;`,
                (err, result) => {
                  if (err) throw err;
                  etapeACV = result.map((row) => row.idEtapeACV);
                  resolve();
                }
              );
            })
          );

          Promise.all(promises)
            .then(() => {
              promises = [];
              promises.push(
                new Promise((resolve, reject) => {
                  OPSIAN_db.query(
                    `SELECT idItem 
                    FROM Item_U 
                    WHERE idPush = ${idPush};`,
                    (err, result) => {
                      if (err) throw err;
                      userInv = result.map((row) => row.idItem);
                      resolve();
                    }
                  );
                })
              );

              promises.push(
                new Promise((resolve, reject) => {
                  OPSIAN_db.query(
                    `SELECT MAX(YEAR(dateDebut)),MIN(YEAR(dateDebut))
                    FROM Item_U 
                    WHERE idPush = ${idPush};`,
                    (err, result) => {
                      if (err) throw err;
                      dateMax = result[0]["MAX(YEAR(dateDebut))"];
                      dateMin = result[0]["MIN(YEAR(dateDebut))"];
                      resolve();
                    }
                  );
                })
              );

              Promise.all(promises).then(() => {
                promises.push(
                  new Promise((resolve, reject) => {
                    OPSIAN_db.query(
                      `
                      SELECT COUNT(*) AS result
                      FROM Item_U
                      CROSS JOIN Reference_M ON Item_U.idReference = Reference_M.idReference
                      CROSS JOIN Type_M ON Reference_M.idType = Type_M.idType
                      CROSS JOIN Push_U ON Item_U.idPush = Push_U.idPush
                      WHERE Push_U.idPush = ${idPush} AND (YEAR(Push_U.date)-YEAR(Item_U.dateDebut)-Type_M.dureeVie <0);`,
                      (err, result) => {
                        if (err) throw err;
                        nbPropsEnService = result[0]["result"];
                        resolve();
                      }
                    );
                  })
                );

                promises.push(
                  new Promise((resolve, reject) => {
                    OPSIAN_db.query(
                      `
                      SELECT COUNT(*) AS result
                      FROM Item_U
                      CROSS JOIN Reference_M ON Item_U.idReference = Reference_M.idReference
                      CROSS JOIN Type_M ON Reference_M.idType = Type_M.idType
                      CROSS JOIN Push_U ON Item_U.idPush = Push_U.idPush
                      WHERE Push_U.idPush = ${idPush};`,
                      (err, result) => {
                        if (err) throw err;
                        nbProps = result[0]["result"];
                        resolve();
                      }
                    );
                  })
                );
                
                let requestEff = Date.now();
                for (let year = dateMin; year < dateMax + 1; year++) {
                  impactItem[year] = {};
                  userInv.forEach((idItem) => {
                    impactItem[year][idItem] = {};
                    etapeACV.forEach((idEtapeACV) => {
                      impactItem[year][idItem][idEtapeACV] = {};
                      critere.forEach((idCritere) => {
                        if (idEtapeACV === 3) {
                          promises.push(
                            new Promise((resolve, reject) => {
                              //query impact instantané pour usage
                              OPSIAN_db.query(
                                `SELECT
                                IF(
                                  (
                                    (
                                      ${year}
                                      - YEAR(
                                        (SELECT dateDebut 
                                         FROM Item_U 
                                         WHERE idItem = ${idItem})
                                      )
                                      - (
                                        SELECT type.dureeVie 
                                        FROM Type_M type
                                        JOIN Reference_M ON type.idType = Reference_M.idType
                                        JOIN Item_U ON Item_U.idReference = Reference_M.idReference
                                        WHERE idItem = ${idItem} 
                                        AND YEAR(dateDebut) < ${year + 1}
                                      )
                                    ) < 0
                                  ) 
                                  AND (
                                    (SELECT YEAR(dateDebut) 
                                     FROM Item_U 
                                     WHERE idItem = ${idItem}) < ${year + 1}
                                  ),
                                  (
                                    SELECT COALESCE(SUM(comp.valeur), 0)  
                                    FROM Composant_M comp
                                    JOIN Reference_M ON comp.idType = Reference_M.idType
                                    JOIN Item_U ON Item_U.idReference = Reference_M.idReference
                                    WHERE comp.idCritere = ${idCritere}
                                    AND comp.idEtapeACV = ${idEtapeACV} 
                                    AND idItem = ${idItem}
                                  ),
                                  0
                                ) AS result;`,
                                (err, result) => {
                                  if (err) {
                                    reject(err);
                                  } else {
                                    result.map((row) => {
                                      impactItem[year][idItem][idEtapeACV][
                                        idCritere
                                      ] = { cout: row["result"] };
                                      resolve();
                                    });
                                  }
                                }
                              );
                            })
                          );
                        } else {
                          promises.push(
                            new Promise((resolve, reject) => {
                              //query impact cumulé pour fabrication, distribution, fin de vie
                              OPSIAN_db.query(
                                `SELECT
                                IF(
                                  (SELECT YEAR(dateDebut) 
                                  FROM Item_U 
                                  WHERE idItem = ${idItem}) < ${year + 1},
                                    
                                      (SELECT SUM(comp.valeur) 
                                      FROM Composant_M comp 
                                      JOIN Reference_M ON comp.idType = Reference_M.idType
                                      JOIN Item_U ON Item_U.idReference = Reference_M.idReference
                                      WHERE comp.idCritere = ${idCritere} 
                                      AND comp.idEtapeACV = ${idEtapeACV} 
                                      AND YEAR(dateDebut)<${year + 1}
                                      AND idItem = ${idItem} 
                                      )
                                      ,0) AS result;`,
                                (err, result) => {
                                  if (err) {
                                    reject(err);
                                  } else {
                                    result.map((row) => {
                                      impactItem[year][idItem][idEtapeACV][
                                        idCritere
                                      ] = { cout: row["result"] };
                                      resolve();
                                    });
                                  }
                                }
                              );
                            })
                          );
                        }
                      });
                    });
                  });
                }

                Promise.all(promises)
                  .then((results) => {
                    // Traiter les résultats ici
                    resolve([impactItem, unite]);
                    console.log(`bd request ${request} ${data.user} awsered in ${(Date.now()-timer)/1000}s`);
                    console.log(`calcul for all items answered in ${(Date.now()-requestEff)/1000}s`)
                  })
                  .catch((error) => {
                    // Gérer les erreurs ici
                    console.error("Une erreur s'est produite :", error);
                  });
              });
            })
            .catch((error) => {
              // Gérer les erreurs ici
              console.error("Une erreur s'est produite :", error);
            });
        }, 1000);

        break;
      case "getType": // OK
        setTimeout(() => {
          let refList = [];

          OPSIAN_db.query(
            'SELECT nomReference FROM Reference_M;',
            (err, result) => {
              if (err) throw err;
              //console.log(result);
              refList = result.map((row) => row.nomReference);
              resolve(refList);
            }
          );

          console.log(`bd request ${request} awseredin ${(Date.now()-timer)/1000}s`);
        }, 1000);
        break;
      case "getUser": // OK
        setTimeout(() => {
          let userList = [];

          OPSIAN_db.query("SELECT user FROM User_U;", (err, result) => {
            if (err) throw err;
            userList = result.map((row) => row.user);
            resolve(userList);
          });
          console.log(`bd request ${request} awsered in ${(Date.now()-timer)/1000}s`);
        }, 1000);
        break;
      case "setUser": // OK
        setTimeout(() => {
          //console.log(data.user)
          OPSIAN_db.query(
            `INSERT INTO User_U 
            SET user = "${data.user}"
            ;`,
            (err, result) => {
              if (err) throw err;
              console.log(`=> SET user = ${data.user} OK `);
              resolve(true);
            }
          );

          console.log(`bd request ${request} awsered in ${(Date.now()-timer)/1000}s`);
        }, 1000);
        break;
      case "setUserPush": // à verif
        setTimeout(() => {
          OPSIAN_db.query(
            `INSERT INTO Push_U (date, idUser) 
            VALUES (
              '${data.date}', 
              (SELECT idUser 
              FROM User_U 
              WHERE user = '${data.user}')
            );
            `,
            (err, result) => {
              if (err) throw err;
              console.log(`=> SET userPush = ${data.user}, ${data.date}  OK`);
              resolve(true);
            }
          );

          console.log(`bd request ${request} awsered in ${(Date.now()-timer)/1000}s`);
        }, 1000);
        break;
        3;
      case "setUserInv": // à verif
        setTimeout(() => {
          data.inv.forEach((item) => {
            let ref = item.type;
            let dateAchat = item.dateDebut;

            if (liste_reference.includes(ref)) {
              for (let i = 0; i < item.quantity; i++) {
                OPSIAN_db.query(
                  `INSERT INTO Item_U (dateDebut, idPush, idReference, nomReference)
                  VALUES (
                    '${dateAchat}',
                    (SELECT MAX(push.idPush)
                      FROM Push_U push, User_U user
                      JOIN Push_U ON Push_U.idUser = user.idUser
                      WHERE user.user = '${data.user}'),
                    (SELECT ref.idReference
                    FROM Reference_M ref
                    WHERE ref.nomReference = '${ref}'),
                    '${ref}'
                  )
                ;`,
                  (err, result) => {
                    if (err) throw err;
                    //console.log(`=> SET userInv = ${data.user}  OK`);
                    resolve(true);
                  }
                );
              }
            } else {
              for (let i = 0; i < item.quantity; i++) {
                OPSIAN_db.query(
                  `INSERT INTO Item_U (dateDebut, idPush, idReference, nomReference)
                  VALUES (
                    '${dateAchat}',
                    (SELECT MAX(push.idPush)
                    FROM Push_U push, User_U user
                    JOIN Push_U ON Push_U.idUser = user.idUser
                    WHERE user.user = '${data.user}'),
                    (SELECT ref.idReference
                    FROM Reference_M ref
                    WHERE ref.nomReference = 'default'),
                    '${ref}'
                  );
                  `,
                  (err, result) => {
                    if (err) throw err;
                    //console.log(`=> SET userInv = ${data.user}  OK`);
                    resolve(true);
                  }
                );
              }
            }
          });

          console.log(`bd request ${request} awsered in ${(Date.now()-timer)/1000}s`);
        }, 1000);
        break;
    }
  });
}

// Middleware pour activer CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//requête setInventory (fini)
app.put("/setInventory", async (req, res) => {
  try {
    console.log(`setInventory for ${req.body.user}`);

    let user = req.body.user;
    let inv = req.body.inventory;
    let userList = await bdRequest("getUser");

    if (!userList.includes(user)) {
      await bdRequest("setUser", { user: user });
    }
    await bdRequest("setUserPush", {
      user: user,
      date: toMySQLDateFormat(dayjs()),
    });
    liste_reference = await bdRequest("getType");
    await bdRequest("setUserInv", { user: user, inv: inv });

    res.send(`BD updated with data for ${req.body.user}`);
  } catch (error) {
    console.error(`Error setting user inventory: ${error}`);
    res
      .status(500)
      .send("ERROR: The server encountered difficulties getting the type list");
  }
});

//requête getInventory (fini) => a changer avec SQL + TEST
app.get("/getInventory/:user", (req, res) => {
  console.log(`getInventory for ${req.params.user}`);

  if (req.params.user === undefined) {
    res.send(`ERROR: the user is undefined`);
  } else if (req.params.user in db) {
    res.json(db[req.params.user]);
  } else {
    res.send(`ERROR: the user ${req.params.user} has not been found in the BD`);
  }
});

//requête getImpact (fini)
app.get("/getImpact/:user", async (req, res) => {

  let timer = Date.now();

  let user = req.params.user;
  console.log(`getImpact for ${user}`);

  let userList = await bdRequest("getUser");

  if (user === undefined) {
    res.send(`ERROR: the user is undefined`);
  } else if (userList.includes(user)) {
    bdRequest("getUserImpact", { user: user })
      .then((result) => {
        let annualCost = {};
        let annees = Object.keys(result[0]);
        let items = Object.keys(result[0][annees[0]]);
        let etapeACVList = Object.keys(result[0][annees[0]][items[0]]);
        let critereList = Object.keys(
          result[0][annees[0]][items[0]][etapeACVList[0]]
        );
        
        let formatTimer = Date.now();

        annees.forEach((annee) => {
          let cost = {
            FABRICATION: [0, 0, 0, 0, 0],
            DISTRIBUTION: [0, 0, 0, 0, 0],
            UTILISATION: [0, 0, 0, 0, 0],
            FIN_DE_VIE: [0, 0, 0, 0, 0],
          };

          let resEtapeACVList = Object.keys(cost);

          items.forEach((item) => {
            for (let i = 0; i < etapeACVList.length; i++) {
              for (let j = 0; j < critereList.length; j++) {
                cost[resEtapeACVList[i]][j] +=
                  result[0][annee][item][etapeACVList[i]][critereList[j]].cout;
              }
            }
          });

          annualCost[annee] = cost;
        });

        console.log(`temps formatage données ${(Date.now()-formatTimer) / 1000}`);

        res.json({
          cost: annualCost,
          unite: unite,
          nbItem: nbProps,
          nbItemEnService: nbPropsEnService,
        });
        console.log(`getImpact for ${user} answered in ${(Date.now()-timer)/1000}s`);
      })
      .catch((error) => {
        console.error(`Error computing Impact: ${error}`);
        res.send(
          `ERROR: the server encountimpactItemer dificulties during computing impact`
        );
      });
  } else {
    res.send(`ERROR: the user ${user} has not been found in the BD`);
  }
});

//requête getTypeList (fini)
app.get("/getTypeList", async (req, res) => {
  try {
    console.log("getTypeList");
    liste_reference = await bdRequest("getType");
    res.json(liste_reference);
  } catch (error) {
    console.error(`Error getting type list: ${error}`);
    res
      .status(500)
      .send("ERROR: The server encountered difficulties getting the type list");
  }
});

console.log(`Server try run on port ${port}`);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
