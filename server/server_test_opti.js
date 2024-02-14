#!/usr/bin/env node
import mysql from "mysql";
import express from "express";
import bodyParser from "body-parser";
import Papa from "papaparse";
import yargs from "yargs";
import dayjs from "dayjs";
import bcrypt from "bcryptjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import "dayjs/locale/fr.js";
import { promises as fsPromises } from "fs";
import { hideBin } from "yargs/helpers";

console.log("server test opti");

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

// Définir le facteur de coût
const saltRounds = 10;

const OPSIAN_db = mysql.createConnection({
  //host: "root",
  host: "localhost",
  user: "numuser",
  password: "spocBDD",
  database: "opsian",
  //database: "SPOC_Analyse_Impact_IT",
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

var liste_reference = null;

//fonction conversion date au format mySQL
function toMySQLDateFormat(date) {
  date = dayjs(date);
  return date.toISOString().slice(0, 19).replace("T", " ");
}

//function generation token unique via bcrypt
function generateAuthToken(name, mail) {
  let token_root = `${name}${mail}${Date.now()}`;
  let salt_token = bcrypt.genSaltSync(saltRounds);
  let token = bcrypt.hashSync(token_root, salt_token);
  return token;
}

//async fonction authentification session
async function authCheck(email, token) {
  let hash_token = await bdRequest("authCheck", { email: email });
  let accepted = bcrypt.compareSync(token, hash_token);
  return accepted;
}

//async fonction requêtage BD (interface serveur/BD modéle)
function bdRequest(request, data) {
  console.log(`starting bd request ${request}`);

  return new Promise((resolve) => {
    let timer = Date.now();

    switch (request) {
      case "getUserImpact": // OK
        setTimeout(() => {
          let user = data.user;
          let type = data.type;

          console.log(user, type, request);

          let idPush = null;
          let userInv = null;
          let etapeACV = null;
          let critere = null;
          let impactItem = {};
          let promises = [];

          dateMin = null;
          dateMax = null;
          nbProps = null;
          nbPropsEnService = null;

          promises.push(
            // collecte id dernier push utilisateur
            new Promise((resolve, reject) => {
              OPSIAN_db.query(
                `SELECT MAX(idPush) 
                FROM Push_U 
                JOIN User_U ON Push_U.idUser = User_U.idUser
                WHERE User_U.email_hash = '${user}'
                AND Push_U.inventaire = ${type}
                ;`,
                (err, result) => {
                  if (err) throw err;
                  idPush = result[0]["MAX(idPush)"];
                  console.log("idPush", idPush);
                  resolve();
                }
              );
            })
          );

          promises.push(
            // collecte les unités
            new Promise((resolve, reject) => {
              OPSIAN_db.query(
                `SELECT unite 
                FROM Critere_M
                ;`,
                (err, result) => {
                  if (err) throw err;
                  unite = result.map((row) => row.unite);
                  resolve();
                }
              );
            })
          );

          promises.push(
            // collecte les critéres
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
            // collecte les étapes ACV
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
              if (idPush !== null) {
                promises = [];
                promises.push(
                  // collecte la liste des items de l'inventaire utilisateur
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
                  // collecte la date min et max
                  new Promise((resolve, reject) => {
                    OPSIAN_db.query(
                      `SELECT MAX(YEAR(Push_U.date)),MIN(YEAR(Item_U.dateDebut))
                      FROM Item_U 
                      JOIN Push_U ON Item_U.idPush = Push_U.idPush
                      WHERE Item_U.idPush = ${idPush};`,
                      (err, result) => {
                        if (err) throw err;
                        result.map((row) => {
                          dateMax = row["MAX(YEAR(Push_U.date))"];
                          dateMin = row["MIN(YEAR(Item_U.dateDebut))"];
                        });
                        resolve();
                      }
                    );
                  })
                );

                Promise.all(promises)
                  .then(() => {
                    let requestEff = Date.now();
                    for (let year = dateMin; year < dateMax + 1; year++) {
                      impactItem[year] = {};

                      userInv.forEach((idItem) => {
                        promises = [];

                        impactItem[year][idItem] = {};
                        let inUse = false;

                        promises.push(
                          // regarde si item isUsed
                          new Promise((resolve, reject) => {
                            OPSIAN_db.query(
                              `SELECT EXISTS(
                                SELECT 1 
                                FROM Item_U 
                                JOIN Reference_M ON Item_U.idReference = Reference_M.idReference
                                JOIN Type_M  ON Reference_M.idType = Type_M.idType
                                WHERE idItem = ${idItem}
                                AND YEAR(dateDebut) < ${year + 1}
                                AND ${year} - YEAR(Item_U.dateDebut) - Type_M.dureeVie < 0
                                ) AS 'isUsed';`,
                              (err, result) => {
                                if (err) throw err;
                                inUse = result[0].isUsed === 1;
                                resolve();
                              }
                            );
                          })
                        );

                        Promise.all(promises)
                          .then(() => {
                            promises = [];

                            promises.push(
                              // recupére le calcul du cout + compte le nombre d'item encore en services à date du push + nb total
                              new Promise((resolve, reject) => {
                                OPSIAN_db.query(
                                  `SELECT cout, Item_U.quantité
                            FROM Type_M
                            JOIN Reference_M  ON Reference_M.idType = Type_M.idType
                            JOIN Item_U ON Item_U.idReference = Reference_M.idReference
                            WHERE Item_U.idItem = ${idItem}
                            AND YEAR(Item_U.dateDebut) < ${year + 1}
                            ;`,
                                  (err, result) => {
                                    if (err) throw err;

                                    let jsonData = result.map((row) =>
                                      JSON.parse(row.cout)
                                    )[0];
                                    let quantite = result.map(
                                      (row) => row.quantité
                                    )[0];

                                    if (year === dateMax) {
                                      nbProps = nbProps + quantite;
                                    }

                                    if (result.length === 0) {
                                      jsonData = {
                                        1: {
                                          1: { cout: 0 },
                                          2: { cout: 0 },
                                          3: { cout: 0 },
                                          4: { cout: 0 },
                                          5: { cout: 0 },
                                        },
                                        2: {
                                          1: { cout: 0 },
                                          2: { cout: 0 },
                                          3: { cout: 0 },
                                          4: { cout: 0 },
                                          5: { cout: 0 },
                                        },
                                        3: {
                                          1: { cout: 0 },
                                          2: { cout: 0 },
                                          3: { cout: 0 },
                                          4: { cout: 0 },
                                          5: { cout: 0 },
                                        },
                                        4: {
                                          1: { cout: 0 },
                                          2: { cout: 0 },
                                          3: { cout: 0 },
                                          4: { cout: 0 },
                                          5: { cout: 0 },
                                        },
                                      };
                                    } else {
                                      if (!inUse) {
                                        jsonData["3"] = {
                                          1: { cout: 0 },
                                          2: { cout: 0 },
                                          3: { cout: 0 },
                                          4: { cout: 0 },
                                          5: { cout: 0 },
                                        };
                                      } else {
                                        if (year === dateMax) {
                                          nbPropsEnService =
                                            nbPropsEnService + quantite;
                                        }
                                      }
                                      for (let etape in jsonData) {
                                        for (let critere in jsonData[etape]) {
                                          jsonData[etape][critere].cout *=
                                            quantite;
                                        }
                                      }
                                    }

                                    impactItem[year][idItem] = jsonData;
                                    //console.log(impactItem)
                                    resolve();
                                  }
                                );
                              })
                            );

                            Promise.all(promises)
                              .then(() => {
                                if (
                                  idItem === userInv[userInv.length - 1] &&
                                  year === dateMax
                                ) {
                                  resolve([impactItem, unite]);
                                  console.log(
                                    `bd request ${request} ${
                                      data.user
                                    } awsered in ${
                                      (Date.now() - timer) / 1000
                                    }s`
                                  );
                                  console.log(
                                    `calcul for all items answered in ${
                                      (Date.now() - requestEff) / 1000
                                    }s`
                                  );
                                }
                              })
                              .catch((error) => {
                                // Gérer les erreurs ici
                                console.error(
                                  "Une erreur s'est produite :",
                                  error
                                );
                              });
                          })
                          .catch((error) => {
                            // Gérer les erreurs ici
                            console.error("Une erreur s'est produite :", error);
                          });
                      });
                    }
                  })
                  .catch((error) => {
                    // Gérer les erreurs ici
                    console.error("Une erreur s'est produite :", error);
                  });
              } else {
                resolve("No push for this user");
              }
            })
            .catch((error) => {
              // Gérer les erreurs ici
              console.error("Une erreur s'est produite :", error);
            });
        }, 1000);

        break;
      case "getRef": // OK
        setTimeout(() => {
          let refList = [];

          OPSIAN_db.query(
            "SELECT nomReference FROM Reference_M;",
            (err, result) => {
              if (err) throw err;
              //console.log(result);
              refList = result.map((row) => row.nomReference);
              resolve(refList);
            }
          );

          console.log(
            `bd request ${request} awseredin ${(Date.now() - timer) / 1000}s`
          );
        }, 1000);
        break;
      case "getUser": // OK
        setTimeout(() => {
          let userList = [];

          OPSIAN_db.query("SELECT email_hash FROM User_U;", (err, result) => {
            if (err) throw err;
            userList = result.map((row) => row.email_hash);

            resolve(userList);
          });
          console.log(
            `bd request ${request} awsered in ${(Date.now() - timer) / 1000}s`
          );
        }, 1000);
        break;
      case "login": // à vérif sécu
        setTimeout(() => {
          let rejected = true;
          let inBD = false;
          let auth_token = null;

          OPSIAN_db.query(
            `SELECT password_hash FROM User_U WHERE email_hash = "${data.mail}";`,
            (err, result) => {
              if (err) throw err;
              if (result.length != 0) {
                inBD = true;
                if (
                  bcrypt.compareSync(data.password, result[0].password_hash)
                ) {
                  rejected = false;
                  auth_token = generateAuthToken(data.user, data.mail);

                  OPSIAN_db.query(
                    `UPDATE User_U SET auth_token = '${bcrypt.hashSync(auth_token, bcrypt.genSaltSync(saltRounds))}' WHERE email_hash = "${data.mail}";`,
                    (err, result) => {
                      if (err) throw err;
                    }
                  );
                }
              }
              resolve([rejected, inBD, auth_token]);
            }
          );
          console.log(
            `bd request ${request} awsered in ${(Date.now() - timer) / 1000}s`
          );
        }, 1000);
        break;
      case "setUser": // OK
        setTimeout(() => {
          //console.log(data.user)
          OPSIAN_db.query(
            `INSERT INTO User_U (user, email_hash, password_hash, auth_token) 
            VALUES ('${data.user}', '${data.mail}', '${data.password}', '${bcrypt.hashSync(data.auth_token, bcrypt.genSaltSync(saltRounds))}');`,
            (err, result) => {
              if (err) throw err;
              console.log(`=> SET user = ${data.user} OK `);
              resolve(true);
            }
          );

          console.log(
            `bd request ${request} awsered in ${(Date.now() - timer) / 1000}s`
          );
        }, 1000);
        break;
      case "setUserPush": // OK
        setTimeout(() => {
          OPSIAN_db.query(
            `INSERT INTO Push_U (inventaire,date, idUser) 
            VALUES (
              ${data.type},
              '${data.date}', 
              (SELECT idUser 
              FROM User_U 
              WHERE email_hash = '${data.user}')
            );
            `,
            (err, result) => {
              if (err) throw err;
              console.log(`=> SET userPush = ${data.user}, ${data.date}  OK`);
              resolve(true);
            }
          );

          console.log(
            `bd request ${request} awsered in ${(Date.now() - timer) / 1000}s`
          );
        }, 1000);
        break;
        3;
      case "setUserInv": // OK
        setTimeout(() => {
          data.inv.forEach((item) => {
            let ref = item.type;
            let dateAchat = item.dateDebut;

            if (liste_reference.includes(ref)) {
              OPSIAN_db.query(
                `INSERT INTO Item_U (dateDebut, idPush, idReference, nomReference, quantité)
                VALUES (
                  '${dateAchat}',
                  (SELECT MAX(push.idPush)
                    FROM Push_U push, User_U user
                    JOIN Push_U ON Push_U.idUser = user.idUser
                    WHERE user.email_hash = '${data.user}'),
                  (SELECT ref.idReference
                  FROM Reference_M ref
                  WHERE ref.nomReference = '${ref}'),
                  '${ref}',
                  ${item.quantity}
                )
              ;`,
                (err, result) => {
                  if (err) throw err;
                  //console.log(`=> SET userInv = ${data.user}  OK`);
                  resolve(true);
                }
              );
            } else {
              OPSIAN_db.query(
                `INSERT INTO Item_U (dateDebut, idPush, idReference, nomReference,quantité)
                VALUES (
                  '${dateAchat}',
                  (SELECT MAX(push.idPush)
                  FROM Push_U push, User_U user
                  JOIN Push_U ON Push_U.idUser = user.idUser
                  WHERE user.email_hash = '${data.user}'),
                  (SELECT ref.idReference
                  FROM Reference_M ref
                  WHERE ref.nomReference = 'default'),
                  '${ref}',
                  ${item.quantity}
                );
                `,
                (err, result) => {
                  if (err) throw err;
                  //console.log(`=> SET userInv = ${data.user}  OK`);
                  resolve(true);
                }
              );
            }
          });

          console.log(
            `bd request ${request} awsered in ${(Date.now() - timer) / 1000}s`
          );
        }, 1000);
        break;
      case "computeCost": // OK
        setTimeout(() => {
          let etapeACV = null;
          let critere = null;
          let types = null;
          let promises = [];

          promises.push(
            // collecte des critéres
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
            // collecte des étapes ACV
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

          promises.push(
            // collecte des types
            new Promise((resolve, reject) => {
              OPSIAN_db.query(
                `SELECT idType 
                FROM Type_M
                ;`,
                (err, result) => {
                  if (err) throw err;
                  types = result.map((row) => row.idType);
                  resolve();
                }
              );
            })
          );

          Promise.all(promises)
            .then(() => {
              let nb_promesse = 0;

              types.forEach((type) => {
                let impactType = {};
                promises = [];

                etapeACV.forEach((idEtapeACV) => {
                  critere.forEach((idCritere) => {
                    impactType[idEtapeACV] = {};

                    promises.push(
                      // calcul cout
                      new Promise((resolve, reject) => {
                        OPSIAN_db.query(
                          // calcul cout pour 1 etape et 1 coup d'un type
                          `SELECT COALESCE(SUM(comp.valeur),0) AS result
                          FROM Composant_M comp 
                          WHERE comp.idType = ${type} 
                          AND comp.idEtapeACV = ${idEtapeACV}
                          AND comp.idCritere = ${idCritere};`,
                          (err, result) => {
                            if (err) {
                              reject(err);
                            } else {
                              result.map((row) => {
                                impactType[idEtapeACV][idCritere] = {
                                  cout: row["result"],
                                };
                              });
                              resolve();
                            }
                          }
                        );
                      })
                    );
                  });
                });

                Promise.all(promises)
                  .then((results) => {
                    // Traiter les résultats ici
                    nb_promesse = nb_promesse + 1;
                    console.log(impactType);

                    OPSIAN_db.query(
                      // met à jour le cout du type
                      `UPDATE Type_M 
                    SET cout = '${JSON.stringify(impactType)}' 
                    WHERE idType = ${type};`,
                      (err, result) => {
                        if (err) throw err;
                        resolve(true);
                      }
                    );

                    console.log(
                      `promesse ${nb_promesse} fini sur ${types.length}`
                    );
                    resolve(true);
                  })
                  .catch((error) => {
                    // Gérer les erreurs ici
                    console.error("Une erreur s'est produite :", error);
                  });
              });

              Promise.all(promises)
                .then((results) => {
                  // Traiter les résultats ici
                  console.log(`=> BD updates costs`);
                  resolve(true);
                })
                .catch((error) => {
                  // Gérer les erreurs ici
                  console.error("Une erreur s'est produite :", error);
                });
            })
            .catch((error) => {
              // Gérer les erreurs ici
              console.error("Une erreur s'est produite :", error);
            });
        }, 1000);
        break;
      case "areCostsComputed": // OK
        setTimeout(() => {
          OPSIAN_db.query(
            // verifi si il y a au moins un cout null dans Type_M
            `SELECT EXISTS(
                SELECT 1 
                FROM Type_M 
                WHERE cout IS NULL OR cout = '{}') AS 'isNullExists';`,
            (err, result) => {
              if (err) throw err;
              // Si 'isNullExists' est 1, cela signifie qu'il y a au moins un champ NULL dans la colonne 'cout'
              // Donc, nous retournons 'false'. Sinon, nous retournons 'true'.
              const allNonNull = result[0].isNullExists === 0;
              console.log(`=> ${allNonNull}`);
              resolve(allNonNull);
            }
          );
        }, 1000);
        break;
      case "authCheck": // à vérif sécu
        setTimeout(() => {
          OPSIAN_db.query(
            `SELECT auth_token 
            FROM User_U 
            WHERE email_hash = '${data.email}';`,
            (err, result) => {
              if (err) throw err;
              resolve(result[0].auth_token);
            }
          );
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

//requête setInventory (à check secu multi user)
app.put("/setInventory/:user/:token", async (req, res) => {
  try {
    let user = req.params.user;
    let token = decodeURIComponent(req.params.token);
    let accepted = await authCheck(user, token);
    console.log(`=> setInventory for ${user} accepted ${accepted}`);

    if (accepted) {
      console.log(`=> setInventory for ${req.body.user}`);

      let user = req.body.user;
      let inv = req.body.inventory;
      let type = req.body.type;
      let userList = await bdRequest("getUser");

      if (!userList.includes(user)) {
        await bdRequest("setUser", { user: user });
      }
      await bdRequest("setUserPush", {
        user: user,
        date: toMySQLDateFormat(dayjs()),
        type: type,
      });
      liste_reference = await bdRequest("getRef");
      await bdRequest("setUserInv", { user: user, inv: inv });

      res.send(`BD updated with data for ${req.body.user}`);
    } else {
      res.send(`ERROR: the auth token is invalid`);
    }
  } catch (error) {
    console.error(`Error setting user inventory: ${error}`);
    res
      .status(500)
      .send("ERROR: The server encountered difficulties getting the type list");
  }
});

//requête setUser (à check secu multi user)
app.put("/setUser", async (req, res) => {
  try {
    console.log(`=> setUser for ${req.body.name}`);

    let user_name = req.body.name;
    let user_mail = req.body.mail;
    let user_password = req.body.password;

    //console.log(user_name, user_mail, hashedMail , bcrypt.compareSync(user_mail, hashedMail), user_password, hashedPassword, bcrypt.compareSync(user_password, hashedPassword));

    /*let user_organisme = req.body.organisme; */ // à faire plus tard

    let userList = await bdRequest("getUser");

    if (!userList.includes(user_mail)) {
      // Générer un sel
      let salt_password = bcrypt.genSaltSync(saltRounds);

      // Hacher le mot de passe avec le sel
      let hashedPassword = bcrypt.hashSync(user_password, salt_password);

      // Auth token
      let auth_token = generateAuthToken(user_name, user_mail);
      console.log(auth_token);

      await bdRequest("setUser", {
        user: user_name,
        mail: user_mail,
        password: hashedPassword,
        auth_token: auth_token,
      });

      res.send(auth_token);
    } else {
      res.send(`Already in the BD`);
    }
  } catch (error) {
    console.error(`Error setting user : ${error}`);
    res
      .status(500)
      .send("ERROR: The server encountered difficulties setting user");
  }
});

//requête login (à check secu multi user)
app.put("/login", async (req, res) => {
  try {
    let user_mail = req.body.mail;
    let user_password = req.body.password;

    console.log(`=> login for ${user_mail}`);

    //console.log(user_name, user_mail, hashedMail , bcrypt.compareSync(user_mail, hashedMail), user_password, hashedPassword, bcrypt.compareSync(user_password, hashedPassword));

    /*let user_organisme = req.body.organisme; */ // à faire plus tard

    const [rejected, inBD, auth_token] = await bdRequest("login", {
      mail: user_mail,
      password: user_password,
    });

    if (!inBD) {
      res.send("notInBd");
    } else if (rejected) {
      res.send("rejected");
      console.log("rejected");
    } else {
      res.send(auth_token);
      console.log("accepted");
    }
  } catch (error) {
    console.error(`Error setting user : ${error}`);
    res
      .status(500)
      .send("ERROR: The server encountered difficulties setting user");
  }
});

//requête getImpact (à check secu multi user)
app.get("/getImpact/:user/:type/:token", async (req, res) => {
  let user = req.params.user;
  let token = decodeURIComponent(req.params.token);
  let accepted = await authCheck(user, token);
  console.log(`=> getImpact for ${user} accepted ${accepted}`);

  if (accepted) {
    let timer = Date.now();
    let type = req.params.type;
    let userList = await bdRequest("getUser");

    console.log(`=> getImpact for ${user} type ${type}`);

    if (user === undefined) {
      res.send(`ERROR: the user is undefined`);
    } else if (userList.includes(user)) {
      if (!(await bdRequest("areCostsComputed"))) {
        await bdRequest("computeCost");
      }

      bdRequest("getUserImpact", { user: user, type: type })
        .then((result) => {
          //console.log(result[0]);
          if (result !== "No push for this user") {
            let annualCost = {};
            let annees = Object.keys(result[0]);
            let items = Object.keys(result[0][annees[0]]);
            let etapeACVList = Object.keys(result[0][annees[0]][items[0]]);
            let critereList = Object.keys(
              result[0][annees[0]][items[0]][etapeACVList[0]]
            );

            //console.log(annees, etapeACVList, result[0][annees[0]][items[0]]);

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
                    let cout =
                      result[0][annee][item][etapeACVList[i]][critereList[j]]
                        .cout;
                    cost[resEtapeACVList[i]][j] +=
                      cout === undefined ? 0 : cout;
                  }
                }
              });

              annualCost[annee] = cost;
            });

            console.log(
              `temps formatage données ${(Date.now() - formatTimer) / 1000}`
            );

            res.json({
              cost: annualCost,
              unite: unite,
              nbItem: nbProps,
              nbItemEnService: nbPropsEnService,
            });
            console.log(
              `getImpact for ${user} answered in ${
                (Date.now() - timer) / 1000
              }s`
            );
          } else {
            res.send(`No push for this user`);
          }
        })
        .catch((error) => {
          console.log(`Error computing Impact: ${error}`);
          res.send(
            `ERROR: the server encounting difficulties during computing impact`
          );
        });
    } else {
      res.send(`ERROR: the user ${user} has not been found in the BD`);
    }
  } else {
    res.send(`ERROR: the auth token is invalid`);
  }
});

//requête getRefList (à check secu multi user)
app.get("/getRefList/:user/:token", async (req, res) => {
  try {
    console.log("=> getRefList");

    let user = req.params.user;
    let token = decodeURIComponent(req.params.token);
    let accepted = await authCheck(user, token);
    console.log(`=> getRefList for ${user} accepted ${accepted}`);

    if (accepted) {
      liste_reference = await bdRequest("getRef");
      res.json(liste_reference);
    } else {
      res.send(`ERROR: the auth token is invalid`);
    }
  } catch (error) {
    console.error(`Error getting ref list: ${error}`);
    res
      .status(500)
      .send("ERROR: The server encountered difficulties getting the type list");
  }
});

//requête computeCost (fini) /!\ pas d'implémentation dans front, que maintenance admin (wget <url>:<port>/computeCost par exemple)
app.get("/computeCost", async (req, res) => {
  try {
    console.log("computeCost");
    await bdRequest("=> computeCost");
    res.send(`BD updates costs `);
  } catch (error) {
    console.error(`Error computeCost: ${error}`);
    res
      .status(500)
      .send("ERROR: The server encountered difficulties computeCost");
  }
});

//requête areCostsComputed (à faire) /!\ pas d'implémentation dans front, que maintenance admin (wget <url>:<port>/areCostsComputed par exemple)
app.get("/areCostsComputed", async (req, res) => {
  try {
    console.log("=> areCostsComputed");
    let areCostsComputed = await bdRequest("areCostsComputed");
    console.log(areCostsComputed);
    res.send(`areCostsComputed ${areCostsComputed}`);
  } catch (error) {
    console.error(`Error areCostsComputed: ${error}`);
    res
      .status(500)
      .send("ERROR: The server encountered difficulties areCostsComputed");
  }
});

console.log(`Server try run on port ${port}`);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
