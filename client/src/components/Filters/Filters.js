import React, { useState } from "react";
import s from "./Filters.module.css";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

export default function Filters() {
  const [selectValue, setSelectValue] = React.useState("");
  const [/*orden*/, setOrden] = useState("");
  // const handlechange = (event) => {
  //   const value = event.target.value;
  //   setSelectValue(value);
  // };

  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  //const types = useSelector((state) => state.types);

  React.useEffect(() => {
    if (!pokemons[0]) {
      dispatch(actions.getPokemons());
      dispatch(actions.getTypes());
    }
  }, [dispatch, pokemons]);

  function handleClick(e){
    e.preventDefault();
    dispatch(actions.getPokemons())
    console.log('resetear filtros')
  };

  function handleFilterType(e) {
    e.preventDefault();
    const value = e.target.value;
    setSelectValue(value);
    dispatch(actions.filterByType(value));
  }

  function handleSortByAlpha(e) {
    e.preventDefault();
    dispatch(actions.sortByAlphabet(e.target.value));
    setOrden(`Ordenado ${e.target.value}`)
    console.log('ordenado por alfabeto')
  }

  function handleSortByAttack(e) {
    e.preventDefault();
    dispatch(actions.sortByAttack(e.target.value));
    setOrden(`Ordenado ${e.target.value}`)
    console.log('ordenado por attack')
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
            <option value="normal">normal</option>
            <option value="poison">poison</option>
            <option value="psychic">psychic</option>
            <option value="rock">rock</option>
            <option value="shadow">shadow</option>
            <option value="steel">steel</option>
            <option value="unknow">unknow</option>
            <option value="water">water</option>
          </select>
          {selectValue && <h2 className={s.showFilter}>{selectValue}</h2>}
        </div>
      </div>
      
      <div className={s.filterBy}>
        <h3 className={s.filterSubitle}>Created in</h3>
        <select className={s.select} value="default">
          <option value="default" disabled hidden>
            Created in
          </option>
          <option value="API">API</option>
          <option value="Data Base">Data Base</option>
        </select>
      </div>
      
      <div className={s.filters}>
        <div className={s.filterBy}>
          <h3>Sort by Alphabet</h3>
          <select
            value="default"
            onChange={(e) => handleSortByAlpha(e)}
          >
            <option value="default" disabled hidden>
              Sort by Alphabet
            </option>
            <option value="asc">From A to Z</option>
            <option value="desc">From Z to A</option>
          </select>
        </div>
      </div>

      <div className={s.filters}>
        <div className={s.filterBy}>
          <h3>Sort by Attack</h3>
          <select
            value="default"
            onChange={(e) => handleSortByAlpha(e)}
          >
            <option value="default" disabled hidden>
              Sort by Attack
            </option>
            <option value="asc">From - to +</option>
            <option value="desc">From + to -</option>
          </select>
        </div>
      </div>

      <button className={s.filterBtn} onClick={(e) => {handleClick(e)}}>Reset filters</button>
    </div>

  );
}

//filtro por type
//filtro por creado en db o en api

//alfabeticamente ascendente y descendente
//ordenar por atack ascend y descenden

/* <option onChange={()=> filterByType("normal")} value="normal">normal</option>
            <option handleChange={()=> filterByType(setSelectValue)} value="fighting">fighting</option>
            <option handleChange={()=> filterByType(setSelectValue)} value="flying">flying</option>
            <option handleChange={()=> filterByType(setSelectValue)} value="poison">poison</option>
            <option handleChange={()=> filterByType(setSelectValue)} value="ground">ground</option>
            <option value="rock">rock</option>
            <option value="bug">bug</option>
            <option value="ghost">ghost</option>
            <option value="steel">steel</option>
            <option value="fire">fire</option>
            <option value="water">water</option>
            <option value="grass">grass</option>
            <option value="electric">electric</option>
            <option value="psychic">psychic</option>
            <option value="ice">ice</option>
            <option value="dragon">dragon</option>
            <option value="dark">dark</option>
            <option value="fairy">fairy</option>
            <option value="unknow">unknow</option>
            <option value="shadow">shadow</option>*/
