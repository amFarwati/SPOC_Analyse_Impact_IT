import React from 'react';
import { useContext, useEffect,useState } from 'react';
import { User_Context } from '../pages/Dashboard';
import { API_Context } from '../pages/Dashboard';
import "../styles/ResultDisplay.css";
import axios from 'redaxios';


function ResultDisplay(props) {

  const userParc = useContext(User_Context)[0];
  const login = useContext(User_Context)[2];
  const [baseUrl] = useContext(API_Context);
  const [use,setUse] = useState([0,0,0,0,0]);
  const [fab,setFab] = useState([0,0,0,0,0]);
  const [distrib,setDistrib] = useState([0,0,0,0,0]);
  const [fin,setFin] = useState([0,0,0,0,0]);
  const [unite,setUnite] = useState([]);


  const formatageCout = (coutJSON)=>{ 
/*coutJSON tel que 
      FABRICATION : [0,0,0,0,0],
      DISTRIBUTION : [0,0,0,0,0],
      UTILISATION : [0,0,0,0,0],
      FIN_DE_VIE : [0,0,0,0,0]
  */
    setUse(coutJSON.UTILISATION)
    setFab(coutJSON.FABRICATION)
    setDistrib(coutJSON.DISTRIBUTION)
    setFin(coutJSON.FIN_DE_VIE)
  };

  const renderCout = (cout)=>{
    return (cout.map((c,i) => {return(<li key={i}>{c} {unite[i]}</li>)}));
  }

  useEffect(() => {
    if(userParc.length !== 0){

      console.log(`ResultDisplay =>`,userParc)

    console.log(`/setInventory ${baseUrl} ${login}_test =>`)

    let data = {  user: `${login}_test`,
                  inventory: userParc,
                }
    
    props.onLoad(true);
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
                    formatageCout(res.data[0]);
                    setUnite(res.data[1]);
                    props.onLoad(false);
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
  
    }
  },[userParc]);

  return (
    <div className='impactScore'>
      <div className='graphics'>
      </div>
      <div className='camemberts'>
      </div>
      <div className='texts'> 
          <ul>FABRICATION 
          {renderCout(fab)}
          </ul>
          <ul>DISTRIBUTION 
          {renderCout(distrib)}
          </ul>
          <ul>UTILISATION 
          {renderCout(use)}
          </ul>
          <ul>FIN_DE_VIE 
          {renderCout(fin)}
          </ul>
      </div>
    </div>
  )
}

export default ResultDisplay