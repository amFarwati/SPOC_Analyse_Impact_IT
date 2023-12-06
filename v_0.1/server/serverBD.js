import mysql from 'mysql';

const db = mysql.createConnection({
  host: "localhost",   
  user: "serveur",   
  password: "spocBDD",
  database: "spoc_analyse_impact_it" 
});

db.connect(function(err) {   
  if (err) throw err;   
  console.log("Connecté à la base de données MySQL!"); 
});

db.query("SHOW TABLES", function (err, result) {       
  if (err) throw err;       
  console.log(result);     
});  


