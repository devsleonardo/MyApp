import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'; 
import "./eventoCadastro.css";

import {Link} from 'react-router-dom';
import Navbar from '../../components/navbar/';

import firebase from '../../config/firebase';


function EventoCadastro(props){
    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [documentoAtual, setDocumentoAtual] = useState();    
    const [documentoNova, setDocumentoNova] = useState();    
    const usuarioEmail = useSelector(state => state.usuarioEmail);


    const storage = firebase.storage();
    const db = firebase.firestore();

    useEffect(() => {  
        if(props.match.params.id){                   
            firebase.firestore().collection('atividades').doc(props.match.params.id).get().then(resultado => {
                setTitulo(resultado.data().titulo)       
                setTipo(resultado.data().tipo)  
                setDetalhes(resultado.data().detalhes)                                         
                setDocumentoNova(resultado.data().doc)                                                                                                  
    })
}
},[carregando])

function atualizar(){
    setMsgTipo(null);
    setCarregando(1);

    if(documentoNova)    
    storage.ref(`documentos/${documentoNova.name}`).put(documentoNova);
    
        db.collection('eventos').doc(props.match.params.id).update({
            titulo: titulo,
            tipo: tipo,
            detalhes: detalhes,
            doc: documentoNova ? documentoNova.name : documentoAtual            
        }).then(() => {
            setMsgTipo('sucesso');
            setCarregando(0);
        }).catch(erro => {
            setMsgTipo('erro');
            setCarregando(0);
    });
}

    function cadastrar(){
        setMsgTipo(null);
        setCarregando(1);
        
        storage.ref(`documentos/${documentoNova.name}`).put(documentoNova).then(() => {
            db.collection('eventos').add({
                titulo: titulo,
                tipo: tipo,
                detalhes: detalhes,
                usuario: usuarioEmail, 
                documento: documentoNova.name,
                publico: 1,
                criacao: new Date()
            }).then(() => {
                setMsgTipo('sucesso');
                setCarregando(0);
            }).catch(erro => {
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
                <h3 className="mx-auto font-weight-bold">{props.match.params.id ? 'Atualizar Status' : 'Novo Status'}</h3>
            </div>

            <form>
                <div className="form-group my-3">
                    <label>Título:</label>
                    <input onChange={(e) => setTitulo(e.target.value) } type="text" className="form-control" value={titulo && titulo}/>
                </div>

                <div className="form-group my-3">
                    <label>Tipo de atividade:</label>
                    <select onChange={(e) => setTipo(e.target.value) } className="form-control" value={tipo && tipo}>
                        <option disabled selected value>-- Selecione um Status --</option>
                        <option>Pendente</option>
                        <option>Em Andamento</option>
                        <option>Finalizada</option>
                        <option>Cancelada</option>
                    </select>                    
                </div>

                <div className="form-group">
                    <label>Descrição:</label>
                    <textarea onChange={(e) => setDetalhes(e.target.value) } className="form-control" rows="3" value={detalhes && detalhes}/>
                </div>

                <div className="form-group my-3">
                    <label>Upload do Documento {props.match.params.id  ? '(caso queira manter o mesmo documento, não precisa escolher uma nova imagem!)' : null}:</label>
                    <input onChange={(e) => setDocumentoNova(e.target.files[0]) } type="file" className="form-control"/>
                </div>

                <div className="text-center">               
                {
                    carregando > 0 ? <div class="spinner-border text-black mx-auto" role="status"><span class="sr-only">Loading...</span></div>
                    : <button onClick={props.match.params.id ? atualizar : cadastrar} type="button" className="btn  btn-block mt-3 mb-2 btn-cadastro">{props.match.params.id ? 'Atualizar Atividade' : 'Publicar Atividade'}</button>
                }
                </div>
                
            </form>

            <div className="msg-login text-center mt-2">
                {msgTipo === 'sucesso' && <span><strong>Atividade Atualizada!</strong></span>}
                {msgTipo === 'erro' && <span><strong>Ops!</strong> Não foi possível publicar a atividade </span>}               
            </div>
        </div>
        </>
    )
}

export default EventoCadastro;