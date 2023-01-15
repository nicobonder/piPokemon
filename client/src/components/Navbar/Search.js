import React, { useState } from 'react'
import s from './SearchBar.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../redux/actions";

export default function Search() {
  const [name, setName] = useState("")
  const dispatch = useDispatch();
  const history = useHistory();
  const pokemons = useSelector((state)=> state.allPokemons); //estado global con todos los Pokes
  
  function handleInputChange(e) { //setea el name con lo que va escribiendo el usuario
    e.preventDefault();
    setName(e.target.value)
    console.log('search', e.target.value)
  }

  function handleSearch(e) {
    e.preventDefault();
    console.log('pokemons en search', pokemons)
    let findPoke = pokemons.find((poke) => poke.name.toLowerCase() === name.toLowerCase()) //busca el nombre dentro de la array de pokemons
    console.log('findPoke en search', findPoke)
    if(!name){
      alert('Please, enter some name');
    }
    if(findPoke){
      dispatch(actions.searchPokemon(name)); //si lo encuentra se dispara la accion
      history.push(`/pokemons/${findPoke.id}`); //despues redirige para ver el poke
    } else if(!findPoke){
      alert('That Pokemon doesnt exist')
    }
    setName(''); //vacia el input
  }

  return (
    <div className={s.searchContainer}>
      <input 
        className={s.searchBar} 
        type='text' 
        placeholder= "Search by name"
        onChange={(e) => handleInputChange(e)} 
        value={name} 
      />
      <button className={s.btnSearch} onClick={(e) => handleSearch(e)}>GO</button>
    </div>
     
  )
}
