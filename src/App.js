import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from "./store";
import {Provider} from "react-redux";

/*PÁGINAS*/
import Login from './view/login/'
import CreatUsuario from "./view/creatusuario/";
import Home from "./view/home/"
import RecuperarSenha from "./view/recuperar-senha";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path= '/Login' component ={Login} />
        <Route exact path= '/creatusuario' component ={CreatUsuario} />
        <Route exact path= '/' component ={Home} />
        <Route exact path= '/recuperar-senha' component ={RecuperarSenha} />
      </Router>
    </Provider>
  );
}

export default App;
