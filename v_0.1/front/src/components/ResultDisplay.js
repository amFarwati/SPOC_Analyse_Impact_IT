import React from 'react';
import { useContext, useEffect } from 'react';
import { User_Context } from '../pages/Dashboard';
import { API_Context } from '../pages/Dashboard';
import "../styles/ResultDisplay.css";
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'redaxios';


function ResultDisplay() {

  const userParc = useContext(User_Context)[0];
  const login = useContext(User_Context)[2];
  const [baseUrl] = useContext(API_Context);
  var [ges,eau,terresRares] = [0,0,0];

  useEffect(() => {
    if (userParc.length>0){
      console.log(userParc)

      console.log(`/setInventory ${baseUrl} ${login}_test =>`)

      let data = JSON.stringify({ user: `${login}_test`,
                                  inventory: userParc
                                  })

      axios.put(`${baseUrl}/setInventory`, data, { withCredentials: true })
          .then(res => {
              // Vérification si la requête a réussi (statut 200-299)
              if (!res.ok) {
                  throw new Error(`Erreur HTTP! Statut: ${res.status}`);
              }
              // Manipulation des données
              console.log(res.data)
              [ges,eau,terresRares] = res.data;
          })
          .catch(error => {
              // Gestion des erreurs
              console.error('Erreur de redaxios:', error.message);
          });


      console.log(`/getImpact ${baseUrl} ${login}_test =>`)

      axios.get(`${baseUrl}/getImpact/${login}_test`, { withCredentials: true })
          .then(res => {
              // Vérification si la requête a réussi (statut 200-299)
              if (!res.ok) {
                  throw new Error(`Erreur HTTP! Statut: ${res.status}`);
              }
              // Manipulation des données
              console.log(res.data)
              [ges,eau,terresRares] = res.data;
          })
          .catch(error => {
              // Gestion des erreurs
              console.error('Erreur de redaxios:', error.message);
          });
    }
  },[userParc]);

  let BD = {xAxis:['GES','EAU','Terres Rares'],series:[{data:ges},{data:eau},{data:terresRares}]};

  return (
    <div className='impactScore'>
      <div className='graphics'>
      </div>
      <div className='camemberts'>
      </div>
      <div className='texts'>
        <li>GES : {ges}</li>
        <li>Eau : {eau}</li>
        <li>Terres rares : {terresRares}</li>      
      </div>
    </div>
  )
}

export default ResultDisplay
