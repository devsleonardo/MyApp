import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from "./store";
import {Provider} from "react-redux";

/*PÁGINAS*/
import Login from './view/login/'
import CreatUsuario from "./view/creatusuario/";
import Home from "./view/home/"
import RecuperarSenha from "./view/recuperar-senha";
import EventoCadastro from "./view/evento-cadastro";



function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path= '/' component ={Login} />
        <Route exact path= '/creatusuario' component ={CreatUsuario} />
        <Route exact path= '/home' component ={Home} />
        <Route exact path= '/recuperar-senha' component ={RecuperarSenha} />
        <Route exact path= '/evento-cadastro' component ={EventoCadastro} />
      </Router>
    </Provider>
  );
}

export default App;
