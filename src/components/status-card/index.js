import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import "./status-card.css";


function StatusCard({key,titulo,detalhes}){
  return(
    <div className="col-md-3 col-sm-12">
      <img src="https://via.placeholder.com/100x50" className="card-img-top img-cartao" alt="Doc em anexo"></img>
      
      <div className="card-body">
        <h5>{titulo}</h5>
        <p className="card-text text-justify" >{detalhes}</p>

        <div className="text-center row rodape-car d-flex align-items-center col-3">
          <Link to="" className="bnt btn-sm btn-detalhes">+ detalhes</Link>
        </div>

      </div>
    </div>

  )
}
export default StatusCard;