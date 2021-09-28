import React, { useState } from "react";
import "./recuperar-senha.css";
import {Link} from "react-router-dom";

import firebase from "../../config/firebase";
import "firebase/auth";
import Navbar from "../../components/navbar";

function UsuarioRecuperarSenha(){

  const [email, setEmail] = useState();
  const [msg, setMsg] = useState();

  function RecuperarSenha(){
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
        <form className="text-center form-login mx-auto mt-5 text-black">
          <h3 clasName="my-5 text-white"> Insira seu email! </h3>
          
          <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control mt-3 my-2" placeholder="Email"/>
          
          <div className="msg my-4 text-center text-black">
            { msg === "sucesso" && <span> Enviamos um link para o seu email para você redefinir a senha! </span>}
            { msg === "erro" && <span> Verifique se o email está correto! </span>}
          </div>

          <button onClick={RecuperarSenha} type="button" className="btn btn-lg btn-block bnt-enviar my-3" >Recuperar Senha</button>
          
          
        </form>
      </div>
    </>
  )
}

export default UsuarioRecuperarSenha;