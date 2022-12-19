import React, { useEffect } from "react";
import s from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../redux/actions";

export default function Detail(props) {
  const dispatch = useDispatch();
  const pokemonDetail = useSelector((state) => state.pokemonDetail);
  console.log('detail', pokemonDetail)
  console.log('detail attack', pokemonDetail.attack)
  console.log('detail type', pokemonDetail.type)
  //console.log('detail type 0', pokemonDetail.type[0])

  useEffect(() => {
    dispatch(actions.getPokemonDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);


  return (
    <div className={s.detailSection}>
      <div className={s.pokeDetail}>
        <h2 className={s.detailTitle}>
          {pokemonDetail.name} - #{props.match.params.id}
        </h2>
        <div>
          <img
            className={s.detailImg}
            src={pokemonDetail.img}
            alt={`pokemon ${props.match.params.id}`}
          />
        </div>
        <div>
          <div className={s.infoDiv}>
            <h3 className={s.detailSubTitle}>HP</h3>
            <p className={s.infoDetail}>{pokemonDetail.hp}</p>
          </div>
          <div className={s.infoDiv}>
            <h3 className={s.detailSubTitle}>Attack</h3>
            <p className={s.infoDetail}>{pokemonDetail.attack}</p>
          </div>
          <div className={s.infoDiv}>
            <h3 className={s.detailSubTitle}>Defense</h3>
            <p className={s.infoDetail}>{pokemonDetail.defense}</p>
          </div>
          <div className={s.infoDiv}>
            <h3 className={s.detailSubTitle}>Speed</h3>
            <p className={s.infoDetail}>{pokemonDetail.speed}</p>
          </div>
          <div className={s.infoDiv}>
            <h3 className={s.detailSubTitle}>Height</h3>
            <p className={s.infoDetail}>{pokemonDetail.height}</p>
          </div>
          <div className={s.infoDiv}>
            <h3 className={s.detailSubTitle}>Weight</h3>
            <p className={s.infoDetail}>{pokemonDetail.weight}</p>
          </div>
          <div className={s.infoDiv}>
            <h3 className={s.detailSubTitle}>Type</h3>
              <p className={s.infoDetail}>{pokemonDetail.type}</p>
          </div>
            
          
        </div>
        <div className={s.btnDiv}>
          <button className={s.btnDetail}>Update</button>
          <button className={s.btnDetail}>Delete</button>
        </div>
      </div>
    </div>
  );
}

/*update y delete deberian estar activos solo si fueron creados en la db*/
//en lugar de link deberia tener un boton que con un onClick despache la action para ir a getPokemon/id
