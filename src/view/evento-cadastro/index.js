import React, { useState } from "react";
import {useSelector} from 'react-redux';
import "./eventoCadastro.css";
import {Link} from "react-router-dom";
import Navbar from "../../components/navbar";

import firebase from "../../config/firebase";


function EventoCadastro(){
  
  const [carregando, setCarregando] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [titulo, setTitulo] = useState();
  const [tipo, setTipo] = useState();
  const [detalhes, setDetalhes] = useState();
  const [arquivo, setArquivo] = useState();
  const usuarioEmail = useSelector(state => state.usuarioEmail);

  const db = firebase.firestore();
  const storage = firebase.storage();

  function Cadastrar(){
    setMsgTipo(null);
    setCarregando(1);
     
    storage.ref(`documentos/${arquivo.name}`).put(arquivo).then(()=>{
      db.collection('atividades').add({
        titulo: titulo,
        tipo: tipo,
        detalhes: detalhes,
        arquivo: arquivo.name,
        usuario: usuarioEmail
      }).then(()=>{
          setMsgTipo('sucesso');
          setCarregando(0);
      }).catch(erro =>{
          setMsgTipo('erro');
          setCarregando(0);
    });
  });
}

  return(

    <>
    <Navbar/>
      <div className="col-12 mt-5">

        <div className="row">
          <h3 className="text-center mx-auto font-weight-bold my-2" > Novo Envento</h3>
        </div>

        <form>
          <div className="form-group my-2">
            <label className="my-2">Titulo:</label>
            <input onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control"></input>
          </div>

          <div className="form-group">
            <label className="my-2">Tipo do evento:</label>
            <select onChange={(e) => setTipo(e.target.value)} className="form-control">
              <option disable selected value >--Status da Atividade--</option>
              <option>Pendente</option>
              <option>Em andamento</option>
              <option>Finalizada</option>
              <option>Cancelada</option>
            </select>
          </div>

          <div className="form-group my-2 row">
            <label className="my-2">Descrição:</label>
            <textarea onChange={(e) => setDetalhes(e.target.value)} type="text" className="form-control" rows="4" ></textarea>
          </div>

          <div className="form-group my-2">
            <label onChange={(e) => setArquivo(e.target.files[0])} className="my-2">Upload do documento:</label>
            <input type="file" className="form-control"></input>
          </div>

          <div className="msg-login text-black text-center my-2 row">
            { msgTipo === 'sucesso' && <span className="text-center"> Atividade Salva! </span>}
            { msgTipo === 'erro' && <span className="text-center"> Ops, Não foi possivel salvar a atividade! </span>}
          </div>

          <div className="text-center">
          { carregando > 0 ? <button class="btn btn-primary" type="button" disabled> <span class="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>Carregando...</button> :
            <button onClick={Cadastrar} type="button" className="btn btn-block mt-3 mb-5 btn-cadastro"> Publicar Atividade </button>}
          </div>

        </form>


      </div>
    </>
  )
}

export default EventoCadastro;