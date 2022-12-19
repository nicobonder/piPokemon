import React from 'react'
import s from './PokeCard.module.css'
import { Link } from "react-router-dom";
//import { useDispatch } from "react-redux";
//import * as actions from '../../redux/actions'

export default function PokeCard(props) {
  return (
    <div className={s.pokeCard}>
        <Link className={s.pokeLink} to={`/pokemons/${props.id}`}><h2 className={s.cardTitle}>{props.name} - #{props.id}</h2></Link>
        <img className={s.PokeImage} src={props.image} alt={props.name} />
        {props.types.length === 2 ? (
          <div className={s.types}>
            <p className={s.PokeInfo}>
              {props.types[0]}, {props.types[1]}
            </p>
          </div>
        ) : (
          <div className={s.types}>
            <p className={s.PokeInfo}>
              {props.types[0]}
            </p>
          </div>
        )}
    </div>
  )
}
