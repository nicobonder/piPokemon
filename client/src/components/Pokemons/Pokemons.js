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
  const types = useSelector((state)=> state.types);
  const filterByType = useSelector((state)=> state.filterByType);

  React.useEffect(() => {
    dispatch(actions.getPokemons());
    dispatch(actions.getTypes());
  },[dispatch])

  console.log('filteredBytype', filterByType)
  return (
    <div className={s.pokemonsSection}>
      <Filters />
      <div className={s.allPokemons}>
        {
          pokemons.map(poke =>{
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

/*      <div className={s.allPokemons}>
        {//si hay un filterbytype mostra lo q incluya ese filtro. Si no existe mapea todo pokemons
          pokemons.filter((el) => filterByType ? el.types.includes(filterByType) : true ).map(poke =>{
            return <PokeCard 
            key={poke.id} 
            id={poke.id} 
            name={poke.name} 
            image={poke.img} 
            types={poke.types}/>
          }) 

        }
*/