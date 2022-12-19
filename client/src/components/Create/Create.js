import React, { useEffect, useState } from "react";
import s from "./Create.module.css";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

export default function Create() {
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState({
    name: "",
    attack: 0,
    defense: 0,
    speed: 0,
    hp: 0,
    height: 0,
    weight: 0,
    image: "",
    types: [],
  });

  const handleSubmit = (e) => {
//FALTAN LAS VALIDACIONES DEL FRONT

    e.preventDefault();
    dispatch(actions.createPokemon(input));
    console.log("form submited");
    setInput({
      //resetea el estado del input
      name: "",
      attack: 0,
      defense: 0,
      speed: 0,
      hp: 0,
      height: 0,
      weight: 0,
      image: "",
      types: [],
    });
    history.push("/pokemons"); //despues redirige para ver todos los poke
  };

  function handleSelect(e) {
    //recibe el tipo que se seleccionó en el selector
    if (!input.types.includes(e.target.value)) {
      //evita que se repitan los tipos
      setInput({
        ...input,
        types: [...input.types, e.target.value], //al array de la prop type le añade el nuevo tipo que se seleccionó
      });
    }
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  function handleDelete(el) {
    //recibe un evento, que es el click en la X de un tipo
    setInput({
      ...input,
      types: input.types.filter((t) => t !== el), //se filtra el array de la prop type, dejando pasar solo aquellos tipos que no coinciden con el clickeado
    });
  }

  useEffect(() => {
    dispatch(actions.getTypes()); //al montarse el comp me trae todos los tipos
  }, [dispatch]);

  return (
    <div className={s.formSection}>
      <h2>Create your own Pokemon</h2>
      <div className={s.form}>
        <form action="POST" onSubmit={(e) => handleSubmit(e)}>
          <div className={s.inputs}>
            <div className={s.input}>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                name="name"
                value={input.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={s.input}>
              <label htmlFor="attack">Attack: </label>
              <input
                type="number"
                id="attack"
                name="attack"
                value={input.attack}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={s.input}>
              <label htmlFor="defense">Defense: </label>
              <input
                type="number"
                id="defense"
                name="defense"
                value={input.defense}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={s.input}>
              <label htmlFor="speed">Speed: </label>
              <input
                type="number"
                id="speed"
                name="speed"
                value={input.speed}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={s.input}>
              <label htmlFor="hp">Hp: </label>
              <input
                type="number"
                id="hp"
                name="hp"
                value={input.hp}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={s.input}>
              <label htmlFor="height">Height: </label>
              <input
                type="number"
                id="height"
                name="height"
                value={input.height}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={s.input}>
              <label htmlFor="weight">Weight: </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={input.weight}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={s.typeForm}>
              {input.types.length < 2 ? ( //si ya eligio 2, no se muestran las opciones
                <select value="default" onChange={(e) => handleSelect(e)}>
                  {" "}
                  {/*Cuando se selecciona una opcion se ejecuta handleSelect con esa selección*/}
                  <option value="default" disabled hidden>
                    Pokemon type
                  </option>
                  <option value="bug">bug</option>
                  <option value="dark">dark</option>
                  <option value="dragon">dragon</option>
                  <option value="electric">electric</option>
                  <option value="fairy">fairy</option>
                  <option value="fighting">fighting</option>
                  <option value="flying">flying</option>
                  <option value="fire">fire</option>
                  <option value="ghost">ghost</option>
                  <option value="grass">grass</option>
                  <option value="ground">ground</option>
                  <option value="ice">ice</option>
                  <option value="poison">poison</option>
                  <option value="psychic">psychic</option>
                  <option value="rock">rock</option>
                  <option value="shadow">shadow</option>
                  <option value="steel">steel</option>
                  <option value="unknow">unknow</option>
                  <option value="water">water</option>
                </select>
              ) : (
                <p className={s.error}>cannot have more than 2 types</p>
              )}
            </div>
                {/*Se va a mostrar cada type seleccionado*/}
            <div className={s.input}>
              {input.types.map((el) => ( //Recorro el array de la prop type del input
                  <div className={s.typeContent}>
                    {" "}
                    {/*renderizo el type que ya fue seleccionado con un boton X*/}
                    <p>{el}</p>
                    <button
                      className={s.deleteType}
                      type="button"
                      onClick={() => handleDelete(el)}
                    >
                      x
                    </button>{" "}
                    {/*cuando clickeo en X se ejecuta handleDelete*/}
                  </div>
                )
              )}
            </div>
          </div>
          <div className={s.divBtn}>
            <button className={s.formBtn} type="submit">
              Create Pokemon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
