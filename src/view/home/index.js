import React ,{useState, useEffect} from "react";  
import './home.css';
import {Link} from "react-router-dom";
import Navbar from "../../components/navbar";
import {useSelector} from "react-redux"
import firebase from "../../config/firebase"
import StatusCard from "../../components/status-card"

function Home(){

  const [atividades, setAtividades] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  let listaatividades= [];

  useEffect(()=>{
    firebase.firestore().collection('atividades').get().then(async(resultado) => {
      await resultado.docs.forEach(doc=>{
        if(doc.data().titulo.indexOf(pesquisa) > 0)
        {
        listaatividades.push({
          id:doc.id,
          ...doc.data()
        })
      }})
      setAtividades(listaatividades)
    })
  });
  

  return(

    <>
    <Navbar/>    

    <div className="row p-4">
    <input onChange={(e)=> setPesquisa(e.target.value )} type="text" className="form-control" placeholder="Pesquisar atividade pelo título..."/> 
    </div>

    <div className="p-3 row">
     {atividades.map(item => <StatusCard  key={item.id} titulo={item.titulo} detalhes={item.detalhes}/>)}

    </div>
    </>

  )
}

export default Home;