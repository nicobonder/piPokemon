import React, { useEffect } from "react";
import s from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import * as actions from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";

export default function Detail(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const pokemonDetail = useSelector((state) => state.pokemonDetail);
  //console.log('detail', pokemonDetail)
  //console.log('detail name', pokemonDetail.name)
  //console.log('typeof pokemonDetail.types', typeof pokemonDetail.types)  

  useEffect(() => {
    dispatch(actions.getPokemonDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  // function handleDeletePokemon(){
  //   const id = props.match.params.id;
  //   //dispatch(actions.deletePokemon(props.match.params.id))
  //   axios
  //   .delete(`http://localhost:3001/pokemons/${id}`)
  //   .then(() => {
  //     alert("Pokemon deleted!");
  //   });
    
  //   history.push("/pokemons");
  // }  

  // function handleUpdate(e){
  //   dispatch(actions.upd)  
  // }


  return (
    <div className={s.detailSection}>
      <Link className={s.backButton} to='/pokemons'><i className="fa-solid fa-caret-left"></i> Back</Link>
      <div className={s.pokeDetail}>
        <h2 className={s.detailTitle}>
          {pokemonDetail.name} - #{props.match.params.id.slice(0, 4)}
        </h2>
        <div>
          <img
            className={s.detailImg}
            src={pokemonDetail.img}
            alt={`pokemon ${props.match.params.id.slice(0, 4)}`}
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
              {pokemonDetail.types?.map((t) => (
                <p className={s.infoDetail}>{t + ","}</p>
              ))}
          </div>
            
        </div>
        <div className={s.btnDiv}>
          {!pokemonDetail.createdInDB ?
          <button className={s.btnNot} type='submit' disabled >Update</button> :
          <button className={s.btnDetail} type='submit'>Update</button>
        }
           {!pokemonDetail.createdInDB ?
          <button className={s.btnNot} disabled >Delete</button> :
          <button className={s.btnDetail} onClick={() => actions.deletePokemon(pokemonDetail.id)}>Delete</button>
        }
        </div>
      </div>
    </div>
  );
}

/*    const id = props.match.params.id;
    //dispatch(actions.deletePokemon(props.match.params.id))
    axios
    .delete(`http://localhost:3001/pokemons/${id}`)
    .then(() => {
      alert("Pokemon deleted!");
    });
    
    history.push("/pokemons");
  }  
*/