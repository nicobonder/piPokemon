import React from 'react'
import s from './PokeCard.module.css'
import { Link } from "react-router-dom";

export default function PokeCard(props) {
    
  return (
    <div className={s.pokeCard}>
        <Link className={s.pokeLink} to={`/pokemons/id`}><h2 className={s.cardTitle}>{props.name}</h2></Link>
        <img className={s.PokeImage} src={props.image} alt={props.name} />
    </div>
  )
}
/*update y delete deberian estar activos solo si fueron creados en la db*/