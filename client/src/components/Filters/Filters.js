import React, { useState } from "react";
import s from "./Filters.module.css";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { useHistory } from "react-router-dom";

export default function Filters({setCurrentPage}) {
  const [selectValue, setSelectValue] = React.useState("");
  const [selectValueB, setSelectValueB] = React.useState("");
  const [orden, setOrden] = useState("");
  const [ordenB, setOrdenB] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  //const types = useSelector((state) => state.types);
  //console.log('types en filters', types)

  React.useEffect(() => {
    if (!pokemons[0]) {
      dispatch(actions.getPokemons());
      dispatch(actions.getTypes());
    }
  }, [dispatch, pokemons]);

  function handleClick(e) {
    e.preventDefault();
    //const value = e.target.value;
    console.log("resetear filtros");
    dispatch(actions.getPokemons());
    setCurrentPage(1);
    setSelectValue("")
    setSelectValueB("")
    setOrden("")
    setOrdenB("")
    //history.push('/pokemons')
  }

  function handleFilterType(e) {
    e.preventDefault();
    const value = e.target.value;
    setSelectValue(value); //para mostrarle a usuario lo que eligio
    dispatch(actions.filterByType(value)); //disapara la action del reducer
    history.push("/pokemons");
    setCurrentPage(1);
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    const value = e.target.value;
    setSelectValueB(value);
    console.log("filtrar por creado");
    dispatch(actions.filterByCreated(value));
    setCurrentPage(1);
  }

  function handleSortByAlpha(e) {
    e.preventDefault();
    const value = e.target.value;
    dispatch(actions.sortByAlphabet(value));
    setOrden(`Ordered from ${value}`);
    console.log("ordenado por alfabeto");
    history.push("/pokemons");
    setCurrentPage(1);
  }

  function handleSortByAttack(e) {
    e.preventDefault();
    const value = e.target.value;
    dispatch(actions.sortByAttack(value));
    setOrdenB(`Ordered from ${value}`);
    console.log("ordenado por attack");
    history.push("/pokemons");
    setCurrentPage(1);
  }

  return (
    <div className={s.filterSection}>
      <div className={s.filters}>
        <h2 className={s.filterTitle}>Filters</h2>
        <div className={s.filterBy}>
          <h3 className={s.filterSubitle}>Filter by type</h3>

          <select
            className={s.select}
            value="default"
            onChange={(e) => handleFilterType(e)}
          >
            <option value="default" disabled hidden>
              Pokemon type
            </option>
            <option value="all">All</option>
            <option value="bug">Bug</option>
            <option value="dark">Dark</option>
            <option value="dragon">Dragon</option>
            <option value="electric">Electric</option>
            <option value="fairy">Fairy</option>
            <option value="fighting">Fighting</option>
            <option value="flying">Flying</option>
            <option value="fire">Fire</option>
            <option value="ghost">Ghost</option>
            <option value="grass">Grass</option>
            <option value="ground">Ground</option>
            <option value="ice">Ice</option>
            <option value="normal">Normal</option>
            <option value="poison">Poison</option>
            <option value="psychic">Psychic</option>
            <option value="rock">Rock</option>
            <option value="shadow">Shadow</option>
            <option value="steel">Steel</option>
            <option value="unknow">Unknow</option>
            <option value="water">Water</option>
          </select>
          {selectValue && <h3 className={s.showFilter}>{selectValue}</h3>}
        </div>

        <div className={s.filterBy}>
          <h3 className={s.filterSubitle}>Created in</h3>
          <select
            className={s.select}
            value="default"
            onChange={(e) => handleFilterCreated(e)}
          >
            <option value="default" disabled hidden>
              Created in
            </option>
            <option value="All">All</option>
            <option value="API">API</option>
            <option value="Data Base">Data Base</option>
          </select>
          {selectValueB && <h3 className={s.showFilter}>{selectValueB}</h3>}
        </div>
      </div>

      <div className={s.filters}>
        <div className={s.filterBy}>
          <h3 className={s.filterSubitle}>Sort by Alphabet</h3>
          <select value="default" onChange={(e) => handleSortByAlpha(e)}>
            <option value="default" disabled hidden>
              Sort by Alphabet
            </option>
            <option value="a-z" onClick={(e) => handleSortByAlpha(e)}>
              From A to Z
            </option>
            <option value="z-a" onClick={(e) => handleSortByAlpha(e)}>
              From Z to A
            </option>
          </select>
          {orden && <h3 className={s.showFilter}>{orden}</h3>}
        </div>
      </div>

      <div className={s.filters}>
        <div className={s.filterBy}>
          <h3 className={s.filterSubitle}>Sort by Attack</h3>
          <select value="default" onChange={(e) => handleSortByAttack(e)}>
            <option value="default" disabled hidden>
              Sort by Attack
            </option>
            <option value="- to +" onClick={(e) => handleSortByAlpha(e)}>
              From - to +
            </option>
            <option value="+ to -" onClick={(e) => handleSortByAlpha(e)}>
              From + to -
            </option>
          </select>
          {ordenB && <h3 className={s.showFilter}>{ordenB}</h3>}
        </div>
      </div>

      <button className={s.filterBtn} onClick={(e) => handleClick(e)}>
        Reset filters
      </button>
    </div>
  );
}

