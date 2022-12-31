import React, { useState } from "react";
import s from "./Filters.module.css";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { useHistory } from "react-router-dom";

export default function Filters() {
  const [selectValue, setSelectValue] = React.useState("");
  const [selectValueB, setSelectValueB] = React.useState("");
  const [orden, setOrden] = useState("");
  const [ordenB, setOrdenB] = useState("");
  
  const history = useHistory(); 
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  React.useEffect(() => {
    if (!pokemons[0]) {
      dispatch(actions.getPokemons());
      dispatch(actions.getTypes());
    }
  }, [dispatch, pokemons]);

  function handleClick(e){
    //e.preventDefault();
    const value = e.target.value;
    console.log('resetear filtros')
    dispatch(actions.cleanFilter(value))
    //history.push('/pokemons')
  };

  function handleFilterType(e) {
    //e.preventDefault();
    const value = e.target.value;
    setSelectValue(value); //para mostrarle a usuario lo que eligio
    dispatch(actions.filterByType(value)); //disapara la action del reducer
    history.push("/pokemons");
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    const value = e.target.value;
    setSelectValueB(value);
    console.log('filtrar por creado')
    dispatch(actions.filterByCreated(value));
  }

  function handleSortByAlpha(e) {
    //e.preventDefault();
    dispatch(actions.sortByAlphabet(e.target.value));
    setOrden(`Ordered from ${e.target.value}`)
    console.log('ordenado por alfabeto')
  }

  function handleSortByAttack(e) {
    e.preventDefault();
    dispatch(actions.sortByAttack(e.target.value));
    setOrdenB(`Ordered from ${e.target.value}`)
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
            <option value="all">all</option>
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
          {selectValue && <h3 className={s.showFilter}>{selectValue}</h3>}
      </div>
      
      <div className={s.filterBy}>
        <h3 className={s.filterSubitle}>Created in</h3>
        <select 
          className={s.select} 
          value="default"  
          onChange={e => handleFilterCreated(e)}
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
          <select
            value="default"
            onChange={(e) => handleSortByAlpha(e)}
          >
            <option value="default" disabled hidden>
              Sort by Alphabet
            </option>
            <option value="a-z" onClick={(e) => handleSortByAlpha(e)}>From A to Z</option>
            <option value="z-a" onClick={(e) => handleSortByAlpha(e)}>From Z to A</option>
          </select>
          {orden && <h3 className={s.showFilter}>{orden}</h3>}
        </div>
      </div>

      <div className={s.filters}>
        <div className={s.filterBy}>
          <h3 className={s.filterSubitle}>Sort by Attack</h3>
          <select
            value="default"
            onChange={(e) => handleSortByAttack(e)}
          >
            <option value="default" disabled hidden>
              Sort by Attack
            </option>
            <option value="- to +">From - to +</option>
            <option value="+ to -">From + to -</option>
          </select>
          {ordenB && <h3 className={s.showFilter}>{ordenB}</h3>}
        </div>
      </div>

      <button className={s.filterBtn} onClick={() => handleClick()}>Reset filters</button>
    </div>

  );
}
