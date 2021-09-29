import React, { useState } from "react";
import "./login.css";
import Navbar from "../../components/navbar";
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
    <>
    <Navbar/>
      <div className="login-content d-flex align-center">
        {useSelector(state => state.usuarioLogado) > 0 ? <Redirect to= "/home" /> : null}
        <form className="form-signin form-login mx-auto">
          
          <div className = "text-center form-login mx-auto my-2">
            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control mb-1" id="inputEmail" placeholder="Endereço de E-mail*"/>
            <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control" id="inputPassword" placeholder="Senha*"/>
          </div>

          <button onClick={Logar} className="w-100 btn btn-login my-3" type="button">Login</button>

          <div className="msg-login text-black text-center my-2 mx-5">
            { msgTipo === "sucesso" && <span className="text-center"> Você esta Conectado! &#129488; </span>}
            { msgTipo === "erro" && <span className="text-center"> Verifique se a senha ou usuário estão corretos! &#128546; </span>}
          </div>

        
          <div className="opcoes-login text-left">
            <Link to="recuperar-senha/" className="mt-3" > Esqueceu a senha?</Link>
            <br></br>
            <Link to="creatusuario/" className="mt-3">Quero Cadastrar</Link>
          </div>
        </form>
        </div>
      </>
  )
};

export default Login;
