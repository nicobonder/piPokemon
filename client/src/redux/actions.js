import axios from 'axios';

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const DELETE_POKEMON = "CREATE_POKEMON";
export const GET_TYPES = "GET_TYPES";

//Filtos y ordenamiento
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const SORT_BY_ALPHABET = "SORT_BY_ALPHABET";
export const SORT_BY_ATTACK = "SORT_BY_ATTACK";
export const CLEAN_FILTER = "CLEAR_FILTER"

export const SEARCH_POKEMON = "SEARCH_POKEMON";


export const getPokemons = () => {
    return function(dispatch) {
        return fetch('http://localhost:3001/pokemons')
        .then(res => res.json())
        .then(pokemons => dispatch(
            {type: GET_POKEMONS, payload: pokemons}
        ))
    }
};

export const getPokemonDetail = (id) => {
    return function(dispatch) {
        return fetch(`http://localhost:3001/pokemons/${id}`)    
        .then(res => res.json())
        .then(data => dispatch(
            {type: GET_POKEMON_DETAIL, payload: data[0]}
        ))
    }
};

    export const searchPokemon = (name) => ({
        type: SEARCH_POKEMON, 
        payload: name
    }) 


export const createPokemon = (pokemon) => {
    return async function(dispatch){
        const newPokemon = await axios.post(`http://localhost:3001/pokemons/`, pokemon)
       dispatch({type: CREATE_POKEMON, payload: newPokemon})
    }
    //return { type: CREATE_POKEMON, payload: pokemon}
};

export const deletePokemon = (id) => {
    return { type: DELETE_POKEMON, payload: id}
};

export const getTypes = () => {
    return function(dispatch){
        return fetch('http://localhost:3001/types')
        .then(res => res.json())
        .then(pokemons => {
            let types = [];
            pokemons.map((pokemon) => types.push(pokemon.types))
            dispatch ({type: GET_TYPES, payload: types})
        }
        )
    }
};

export const sortByAlphabet = (order) => {
    return ({type: SORT_BY_ALPHABET, payload: order});
}

export const sortByAttack = (order) => {
    return {type: SORT_BY_ATTACK, payload: order}
}

export const filterByType = (filter) => {
    return {type: FILTER_BY_TYPE, payload: filter}
}

export const filterByCreated = (value) => {
    return {type: FILTER_BY_CREATED, payload: value}
}

export const cleanFilter = (payload) => {
    return {type: CLEAN_FILTER, payload}
}

/* stackoverflow
export const searchPokemon = (name) => ({
    type: SEARCH_POKEMON, 
    payload: name.toLowerCase()
}) 
*/

/*    return async function(dispatch) {
        try {
            let info =  await axios.get("/pokemons?name=" + name);
            return dispatch({
                type: "GET_POKEMON_DETAIL",
                payload: info.data
            })
        } catch(error){
            return 'We couldnt find that Pokemon'
        }     
*/