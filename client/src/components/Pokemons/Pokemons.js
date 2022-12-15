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

  React.useEffect(() => {(
    dispatch(actions.getPokemons())
  )},[dispatch])

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
            type={poke.type} />
          })
        }
      </div>
    </div>
  )
}
