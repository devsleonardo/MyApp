import React, { useState } from "react";
import firebase from "../../config/firebase";
import "firebase/auth";
import "./creatusuario.css";
import Navbar from "../../components/navbar";

function CreatUsuario(){

  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [msg, setMsg] = useState();
  const [carregando, setCarregando] = useState();

  function Cadastrar(){
    setCarregando(1);
    setMsgTipo(null);
    if(!email || !senha ){
      setMsgTipo('erro')
      setCarregando(0)
      setMsg ("Você precisa informar o email e a senha para fazer o cadastro!")
      return;
    }
    
    firebase.auth().createUserWithEmailAndPassword(email,senha).then(resuldado => {
      setCarregando(0)
      setMsgTipo('sucesso')
    }).catch(erro => {  
      setCarregando(0)
      setMsgTipo('erro')
      switch(erro.message)
      {
      case 'Password should be at least 6 characters':
        setMsg('A senha deve ter pelo menos 6 caracteres!');
        break;
      case 'The email addres is already in use by another account.':
        setMsg('Este email já esta sendo utilizado por outro usuári!');
        break;
      case 'The email address is badly formatted.':
        setMsg('O formato do seu email é invalido!');
        break;
      default:
        setMsg('Não foi possivel cadastrar. Tente novamente mais tarde!');
        break;

      }
    })
  }
  

  return(
    <>
  <Navbar/>
    <div className= "form-cadastro">
      <form className = "text-center form-login mx-auto my-2">
        <h2 className="form-titulo mb-3 text-black"> Cadastro de usuários </h2>

        <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Endereço de Email*" /> 
        <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control my-2" placeholder="Senha*" /> 


        {carregando ? <button class="btn btn-light" type="button" disabled> <span class="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>Carregando...</button> :
        <button onClick={Cadastrar} type="button" className="w-100 btn-cadastro btn btn-block mt-3 mb-3"> Registrar </button>}
     


        <div className="msg-login text-black text-center my-2 mx-5">
          { msgTipo === 'sucesso' && <span className="text-center"> Usuário Cadastrado com sucesso!</span>}
          { msgTipo === 'erro' && <span className="text-center"> {msg} </span>}
        </div>

      </form>

    </div>
    </>
  )

}

export default CreatUsuario;