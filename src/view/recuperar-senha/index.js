import React, { useState } from "react";
import "./recuperar-senha.css";
import {Link} from "react-router-dom";

import firebase from "../../config/firebase";
import "firebase/auth";
import Navbar from "../../components/navbar";

function RecuperarSenha(){

  const [email, setEmail] = useState()
  const [msg, setMsg] = useState()

  function RecuSenha(){
    firebase.auth().sendPasswordResetEmail(email).then(resultado => {
      setMsg("sucesso");
    }).catch(erro => {
      setMsg("erro");
    })
  }

  return(
    <>
    <Navbar/>
        <div className="form-cadastro">
        <form className="text-center form-login mx-auto mt-5 text-white">
          <h3 clasName="mt-5 text-white"> Esqueceu sua senha? </h3>
          
          <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email"/>
          
          <button onClick={RecuSenha} className="btn btn-lg btn-block bnt-enviar my-3" >Recuperar Senha</button>
          
          <div className="msg my-4 text-center text-white">
            { msg === "sucesso" && <span className="text-center"> Enviamos um link para o seu email para você redefinir a senha! </span>}
            { msg === "erro" && <span className="text-center"> Verifique se o email está correto! </span>}
          </div>
          
        </form>
      </div>
    </>
  )
}

export default RecuperarSenha;