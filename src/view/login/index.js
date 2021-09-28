import React, { useState } from "react";
import "./login.css";
import {Link, Redirect} from "react-router-dom";

import firebase from "../../config/firebase";
import "firebase/auth";

import {useSelector, useDispatch} from 'react-redux';

function Login (){
  
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();

  const dispatch = useDispatch();

  function Logar(){

    firebase.auth().signInWithEmailAndPassword(email,senha).then(resultado =>{
      setMsgTipo("sucesso")
      setTimeout(()=> {
        dispatch({type: 'LOG_IN',usuarioEmail:email});
      },2000);
    }).catch(erro =>{
      setMsgTipo("erro")
    });

  }

  return( 
    <div className="login-content d-flex align-center">
      {useSelector(state => state.usuarioLogado) > 0 ? <Redirect to= "/" /> : null}
      <form className="form-signin mx-auto">
        <div className="text-center mb-4">
        <i class="fab fa-dev text-white fa-10x"></i>
        <h2 className="h3 mb-3 fw-bold text-white">Entrar no sistema</h2>
        </div>
         
        <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control mb-1" id="inputEmail" placeholder="Endereço de E-mail"/>
        <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control" id="inputPassword" placeholder="Senha"/>
      
        <button onClick={Logar} className="w-100 btn btn-lg btn-login my-3" type="button">Login</button>

        <div className="msg-login text-white text-center my-2 mx-5">

          { msgTipo === "sucesso" && <span className="text-center"> Você esta Conectado! &#129488; </span>}
          { msgTipo === "erro" && <span className="text-center"> Verifique se a senha ou usuário estao corretos! &#128546; </span>}
         
        </div>

        <div className="opcoes-login text-center">
          <Link to="recuperar-senha/" className="mx-3" >Esqueceu a senha?</Link>
          <Link to="creatusuario/" className="mx-3">Quero Cadastrar</Link>
        </div>

        <p className="mt-2 mb-3 text-center text-white ">@cod3rleo</p>
      </form>
      </div>
  )
};

export default Login;
