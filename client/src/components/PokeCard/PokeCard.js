import React from "react";
import s from "./PokeCard.module.css";
import { Link } from "react-router-dom";
//import { useDispatch } from "react-redux";
//import * as actions from '../../redux/actions'

export default function PokeCard(props) {
  //console.log(' types of props.types[0] en Pokecard', typeof props.types[0])
  return (
    <div className={s.pokeCard}>
      <Link className={s.pokeLink} to={`/pokemons/${props.id}`}>
        <h2 className={s.cardTitle}>
          {props.name.charAt(0).toUpperCase() + props.name.substring(1)}
        </h2>
      <img className={s.pokeImage} src={props.image} alt={props.name} />
      </Link>

      <p className={s.pokeInfo}>{props.types?.map((t) => t.charAt(0).toUpperCase() + t.substring(1) + " ")}</p>
    </div>
  );
}

/*{props.types.length > 1 ? (
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
)}*/

/*
  <p className={s.PokeInfo}>
    {props.types[0]}{props.types[1]?`, ${props.types[1]}`  : null}
  </p>*/
