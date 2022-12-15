import React from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Create from './components/Create/Create';
import Pokemons from './components/Pokemons/Pokemons';
import Detail from './components/Detail/Detail';


import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route exact path='/' component={Home} />
      <Route exact path='/pokemons/:id' component={Detail} />
      <Route exact path='/pokemons' component={Pokemons} />
      <Route exact path='/create' component={Create} />
    </div>
  );
}

export default App;
