import { BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import React from 'react';
import Start from './Components/startPage/Start.js';
import Home from './Components/home/home.js';
import CreateVideogame from './Components/createVideogame/createVideogame.js'
import Details from './Components/details/details.js'

function App() {
  return (
    <BrowserRouter>
    <div>
    <Switch> 
    <Route exact path= '/' component={Start} />
    <Route path= '/home' component={Home} />
    <Route path='/create'component={CreateVideogame} />
    <Route exact path='/videogames/:id'  render={({ match }) => < Details id={match.params.id} />} />
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
