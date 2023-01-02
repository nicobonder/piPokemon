import React, { useState } from 'react'
import s from './SearchBar.module.css'
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";

export default function Search() {
  const [name, setName] = useState("")
  const dispatch = useDispatch();
  
  // React.useEffect(() => {
  //   if (!pokemons[0]) {
  //     dispatch(actions.getPokemons());
  //     dispatch(actions.getTypes());
  //   }
  // }, [dispatch, pokemons]);

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value)
    console.log('search', e.target.value)
  }

  function handleSearch(e) {
    e.preventDefault();
    if(!name){
        return('We didnt find the Pokemon')
    }
    dispatch(actions.searchPokemon(name));
    //console.log('name handle search', name)
    setName(''); //vacio el input
  }


  return (
    <div className={s.searchContainer}>
      <input 
        className={s.searchBar} 
        type='text' 
        placeholder= "Search by name"
        onChange={(e) => handleInputChange(e)} 
        value={name} 
      />
      <button className={s.btnSearch} onClick={(e) => handleSearch(e)}>GO</button>
    </div>
     
  )
}

/*  function handleSearch(e) {
    e.preventDefault();
    let match = pokemons.find((p) => p.name === input)
    if(match){
      dispatch(actions.searchPokemon(input));
      history.push(`/pokemons?name=${input}`); //redirijo a la pagina de ese poke
      setInput(''); //vacio el input
    } else {
      alert('that Pokemon doesnt exist. Try again.')
      setInput('')
    }
  }*/

  //antes de dropdown sugerencias
  /*<div>
      <form onSubmit={handleSearch} className={s.searchForm}>
        <input 
        className={s.searchBar} 
        type='text' 
        value={input} 
        onChange={handleInputChange} 
        placeholder= "Search by name"
        onClick={() => setInput('')} 
        />
      
      </form>
    </div>*/


//con sugerencia

// function handleSearch(searchTerm) {
//   setValue(searchTerm); 
//   if(!value){
//     return ('Not found')
//   } else{
//     dispatch(actions.searchPokemon(value));
//     console.log('value handle search', value)
//     setValue(''); //vacio el input
//       //history.push(`/pokemons?name=${input}`); //redirijo a la pagina de ese poke
//   }
// }

    // <div className={s.searchContainer}>
    //   <div className={s.searchInner}>
    //     <input 
    //       className={s.searchBar} 
    //       type='text' 
    //       value={value} 
    //       onChange={handleInputChange} 
    //       placeholder= "Search by name"
    //       onClick={() => setValue('')} 
    //     />
    //     <button onClick={() => handleSearch(value)}>GO</button>
    //   </div>
    //   <div className={s.dropDown}>
    //     {pokemons.filter((p) => {
    //       const searchTerm = value.toLowerCase();
    //       const named = p.name.toLowerCase();
    //       return searchTerm && named.startsWith(searchTerm) && named !== searchTerm
    //     })
    //     .slice(0, 5)
    //     .map((el) => (
    //       <div 
    //         onClick={() => handleSearch(el.name)}
    //         className={s.divDrop}
    //         key={el.id}
    //         > {el.name}</div>
    //     ))}
    //   </div>
    // </div>