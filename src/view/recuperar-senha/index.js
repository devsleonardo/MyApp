import React, { useState } from "react";
import "./recuperar-senha.css";
import {Link} from "react-router-dom";

import firebase from "../../config/firebase";
import "firebase/auth";

function RecuperarSenha(){

  const [email, setEmail] = useState()
  const [msg, setMsg] = useState()

  function RecuSenha(){
    firebase.auth().sendPasswordResetEmail(email).then(resultado => {
      setMsg('Enviamos um link para o seu email para você redefinir a senha!');
  }).catch(erro => {
      setMsg('Verifique se o email está correto!');
  })
}

  return(
    <>
        <div className="form-cadastro">
        <form className="text-center form-login mx-auto mt-5 text-white">
          <h3 clasName="mt-5 text-white"> Esqueceu sua senha? </h3>
          <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email"/>
          <div className="msg my-4 text-center text-white">
            <span>{msg}</span>
          </div>
          <button onClick={RecuSenha} className="btn btn-lg btn-block bnt-enviar" >Recuperar Senha</button>
          <br></br>
          <Link><button to = "login/" className="btn btn-lg btn-block bnt-enviar mt-2" >Voltar a tela de Login</button></Link>
        </form>
      </div>
    </>
  )
}

export default RecuperarSenha;