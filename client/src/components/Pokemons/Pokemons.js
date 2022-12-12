import React from 'react'
import s from './Pokemons.module.css'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from '../../redux/actions'

import PokeCard from '../PokeCard/PokeCard';


export default function Pokemons() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state)=> state.pokemons);

  React.useEffect(() => {(
    dispatch(actions.getPokemons())
  )},[dispatch])

  return (
    <div className={s.allPokemons}>
      {
        pokemons.map(poke =>{
          return <PokeCard name={poke.name} image={poke.img} />
        })
      }
     
    </div>
  )
}
