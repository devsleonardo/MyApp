import React from "react";  
import './navbar.css';
import {Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"

function Navbar(){

  const dispatch = useDispatch();
  
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand text-white font-weight-bold" href="#">MyApp</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
         <span className="fas fa-bars text-white"></span></button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item"><Link to="/" className="nav-link active text-white font-weight-bold" aria-current="page">Home</Link></li>

        { useSelector(state => state.usuarioLogado) > 0 ? 
        <>
          <li className="nav-item"><Link to="" className="nav-link active text-white font-weight-bold" >Publicar envento</Link></li>        
          <li className="nav-item"><Link to="" className="nav-link active text-white font-weight-bold" >Meus Eventos</Link></li>
          <li className="nav-item"><Link onClick={() => dispatch({type: 'LOG_OUT'})} className="nav-link active text-white font-weight-bold">Deslogar</Link></li>
        </> 
        :
        <>
          <li className="nav-item"><Link to="/creatusuario" className="nav-link active text-white font-weight-bold" aria-current="page">Cadastrar</Link></li>
          <li className="nav-item"><Link to="/login" className="nav-link active text-white font-weight-bold" aria-current="page">Login</Link></li>
        </>

        }

      </ul>
    </div>
  </div>
</nav>
  )

}

export default Navbar;