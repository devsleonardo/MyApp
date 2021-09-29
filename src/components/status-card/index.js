import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../config/firebase';

import "./status-card.css";

function StatusCard({key,doc,titulo,tipo,detalhes}){

  const [urlDocumento, setUrlDocumento] = useState();

  useEffect(() => {
    firebase.storage().ref(`documentos/${doc}`).getDownloadURL().then(url => setUrlDocumento(url));
}, [urlDocumento]);

  return(

    <div className="form-group rounded-3 shadow ms-2 col-md-3 col-sm-12 form-box mt-2 ">
          
      <div className="card-body">
        <h5>{titulo}</h5>
        <p className="card-text text-justify" >{tipo}</p>
        <p className="card-text text-justify" >{detalhes}</p>

        <div className="text-center row rodape-car d-flex align-items-center col-3">
          <Link to="" className="bnt btn-sm btn-detalhes">+ detalhes</Link>
        </div>

      </div>
    </div>

  )
}
export default StatusCard;