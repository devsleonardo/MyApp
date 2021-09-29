import React ,{useState, useEffect} from "react";  
import './home.css';
import {Link} from "react-router-dom";
import Navbar from "../../components/navbar";
import {useSelector} from "react-redux"
import firebase from "../../config/firebase"
import StatusCard from "../../components/status-card"

function Home({match}){

  const [atividades, setAtividades] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  let listaatividades = []; 
  const usuarioEmail = useSelector(state => state.usuarioEmail);

  useEffect(() => {

  if(match.params.parametro){
      firebase.firestore().collection('eventos').where('usuario','==',usuarioEmail).get().then(async (resultado) => {
          await resultado.docs.forEach(doc => {
             if(doc.data().detalhes.indexOf(pesquisa) >= 0 || doc.data().titulo.indexOf(pesquisa) >= 0 || doc.data().tipo.indexOf(pesquisa) >= 0)
             {
             listaatividades.push({
                 id: doc.id,
                 ...doc.data()
             })
             }
         })
 
         setAtividades(listaatividades);
     });
     
  }else{
      firebase.firestore().collection('eventos').get().then(async (resultado) => {
          await resultado.docs.forEach(doc => {
             if(doc.data().detalhes.indexOf(pesquisa) >= 0 || doc.data().titulo.indexOf(pesquisa) >= 0 || doc.data().tipo.indexOf(pesquisa) >= 0)
             {                   
             listaatividades.push({
                 id: doc.id,
                 ...doc.data()
             })}})
 
         setAtividades(listaatividades);
     });
  }
});

  return(
      <>
      <Navbar/>

      <div className="row p-3 ">
            <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control " placeholder="Pesquisar Atividade...     Pesquisa pode ser feita por Titulo, Descrição e Status" />
      </div>
      
      <div className="row p-3">
      {atividades.map(item => <StatusCard key={item.id} id={item.id} tipo={item.tipo} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes}   />) }

      </div>
      </>
  )
}

export default Home;