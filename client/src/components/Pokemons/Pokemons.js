import React from 'react'
import s from './Pokemons.module.css'
import { useDispatch, useSelector } from "react-redux";

import * as actions from '../../redux/actions'

//importo para poder mapear todas las cards
import PokeCard from '../PokeCard/PokeCard';
import Filters from '../Filters/Filters';

export default function Pokemons() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state)=> state.pokemons);
  const filterByType = useSelector((state)=> state.filterByType);

  React.useEffect(() => {(
    dispatch(actions.getPokemons())
  )},[dispatch])

  console.log('filteredBytype', filterByType)
  return (
    <div className={s.pokemonsSection}>
      <Filters />
      <div className={s.allPokemons}>
        {
          pokemons.filter((el) => filterByType ? el.types.includes(filterByType) : true ).map(poke =>{
            return <PokeCard 
            key={poke.id} 
            id={poke.id} 
            name={poke.name} 
            image={poke.img} 
            types={poke.types}/>
          })
        }

       
      </div>
    </div>  
  )
}


