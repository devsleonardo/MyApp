import React from "react";  
import './navbar.css';
import {Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"

function Navbar(){

  const dispatch = useDispatch();
  
  return(
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
         <span className="fas fa-bars text-white"></span></button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">

        { useSelector(state => state.usuarioLogado) > 0 ? 
        <>
          <li className="nav-item"><Link  className="nav-link active" >Publicar Envento</Link></li>        
          <li className="nav-item"><Link  className="nav-link active" >Meus Eventos</Link></li>
          <li className="nav-item"><Link  className="nav-link active" >Atividades</Link></li>
          <li className="nav-item"><Link  className="nav-link nav-pos active" onClick={() => dispatch({type: 'LOG_OUT'})} >Deslogar</Link></li>
        </> 
        :
        <>
          <li><Link className="mr-3 mt-1 fa-1x fas fa-home text-white" to ="/login"></Link></li>
        </>

        }

      </ul>
    </div>
  </div>
</nav>
  )

}

export default Navbar;