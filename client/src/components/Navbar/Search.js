import React, { useState } from 'react'
import s from './SearchBar.module.css'
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

import PokeCard from '../../components/PokeCard/PokeCard';
import { useHistory } from 'react-router-dom';


export default function Search() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("")
  let history = useHistory();
  const pokemons = useSelector((state)=> state.pokemons);

function handleInputChange(e) {
  e.preventDefault();
  setInput(e.target.value)
  console.log('search', e.target.value)
}

  //funcion para filtrar
  function handleSearch(e) {
    e.preventDefault();
    if(!input){
      return ('We couldnt find that Pokemon');
    }  
    dispatch(actions.searchPokemon(input)) 
  }

  //metodo de filtrado 
//   let AllPokemons = []
//   if(!search){
//     AllPokemons = pokemons
//     } else {
//       AllPokemons = pokemons.filter((t) => t.name.toLowerCase().includes(search.toLocaleLowerCase())  
//   )
// }

// const AllPokemons = !search ? pokemons : pokemons.filter((t) => t.name.toLowerCase().includes.search.toLocaleLowerCase())



  return (
    <div>
      <form onSubmit={handleSearch} className={s.searchForm}>
        <input 
        className={s.searchBar} 
        type='text' 
        value={input} 
        onChange={handleInputChange} 
        placeholder= "Search by name"
        onClick={() => setInput('')} 
        />
      <button type = 'submit' onClick={(e) => handleSearch(e)}>Search</button>
      </form>
    </div>
  )
}

/*  function handleSearch(e) {
    e.preventDefault();
    let match = pokemons.find((p) => p.name === input)
    if(match){
      dispatch(actions.searchPokemon(input));
      history.push(`/pokemons/${input}`); //redirijo a la pagina de ese poke
      setInput(''); //vacio el input
    } else {
      alert('that Pokemon doesnt exist. Try again.')
      setInput('')
    }
  }*/