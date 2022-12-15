import React, { useState } from 'react'
import s from './SearchBar.module.css'
import { useDispatch, useSelector } from "react-redux";

import PokeCard from '../../components/PokeCard/PokeCard';


export default function Search() {
  const [search, setSearch] = useState("")
  const pokemons = useSelector((state)=> state.pokemons);


  //funcion para filtrar
  const searcher = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
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
      <input type='text' placeholder='Search' className={s.searchBar} value={search} onChange={searcher} />
    {
     

    }

    </div>
  )
}
