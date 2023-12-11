import React from 'react';
import { useContext, useEffect,useState } from 'react';
import { User_Context } from './Dashboard';
import { API_Context } from './Dashboard';
import "../styles/ResultDisplay.css";
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'redaxios';


function ResultDisplay() {

  const userParc = useContext(User_Context)[0];
  const login = useContext(User_Context)[2];
  const [baseUrl] = useContext(API_Context);
  const [impact,setImpact] = useState([0,0,0])

  useEffect(() => {
    console.log(`ResultDisplay =>`,userParc)

    console.log(`/setInventory ${baseUrl} ${login}_test =>`)

    let data = { user: `${login}_test`,
                                inventory: userParc
                                }

    axios.put(`${baseUrl}/setInventory`, data, { withCredentials: true, 'Content-Type' : 'application/json' })
        .then(res => {
            // Vérification si la requête a réussi (statut 200-299)
            if (!res.ok) {
                throw new Error(`Erreur HTTP! Statut: ${res.status}`);
            }
            // Manipulation des données
            console.log(`/getImpact ${baseUrl} ${login}_test =>`)

            axios.get(`${baseUrl}/getImpact/${login}_test`, { withCredentials: true })
                .then(res => {
                    // Vérification si la requête a réussi (statut 200-299)
                    if (!res.ok) {
                        throw new Error(`Erreur HTTP! Statut: ${res.status}`);
                    }
                    // Manipulation des données
                    console.log(res.data)
                    setImpact(res.data);
                })
                .catch(error => {
                    // Gestion des erreurs
                    console.error('Erreur de redaxios:', error.message);
                });
        })
        .catch(error => {
            // Gestion des erreurs
            console.error('Erreur de redaxios:', error.message);
        });
  
  },[userParc]);

  let BD = {xAxis:['GES','EAU','Terres Rares'],series:[{data:impact[0]},{data:impact[1]},{data:impact[2]}]};

  return (
    <div className='impactScore'>
      <div className='graphics'>
      </div>
      <div className='camemberts'>
      </div>
      <div className='texts'>
        <li>GES : {impact[0]}</li>
        <li>Eau : {impact[1]}</li>
        <li>Terres rares : {impact[2]}</li>      
      </div>
    </div>
  )
}

export default ResultDisplay
