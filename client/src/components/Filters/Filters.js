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
  //const types = useSelector((state) => state.types);

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
    dispatch(actions.getPokemons(value))
    //history.push('/pokemons')
  };

  function handleFilterType(e) {
    e.preventDefault();
    const value = e.target.value;
    setSelectValue(value); //para mostrarle a usuario lo que eligio
    dispatch(actions.filterByType(value)); //disapara la action del reducer
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
          <option value="All" onClick={handleFilterCreated}>All</option>
          <option value="API" onClick={handleFilterCreated}>API</option>
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

      <button className={s.filterBtn} onClick={(e) => {handleClick(e)}}>Reset filters</button>
    </div>

  );
}

/*Make sure that the handleFilterCreated function is being called when you expect it to be. You can add a console.log statement at the beginning of the function to check if it is being executed.

Check the value of the value variable within the handleFilterCreated function. Make sure that it is being set correctly and that it represents the value you want to use to filter the list of pokemons.

Make sure that the actions.filterByCreated function is being called with the correct arguments and that it is correctly filtering the list of pokemons. You can add a console.log statement before and after the call to actions.filterByCreated to see what the list of pokemons looks like before and after the function is called.*/