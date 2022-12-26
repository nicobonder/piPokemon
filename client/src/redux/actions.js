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
            {type: GET_POKEMON_DETAIL, payload: data[0]},
            console.log('data[0] in actions', data[0])
        ))
    }
};

export const createPokemon = (pokemon) => {
    // const options = {
    //     method: 'POST',
    //     headers: {
    //     'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(pokemon),
    //     };
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

export const sortByAlphabet = (payload) => {
    return ({type: SORT_BY_ALPHABET, payload});
}

export const sortByAttack = (payload) => {
    return {type: SORT_BY_ATTACK, payload}
}

// export const filterByType = (query) => ( getstate) => {
//     const { pokemons } = getstate()
    
//     let resultType = pokemons.filter((p) => p.type.toLowerCase().includes(query.toLowerCase()))

//     return ({type: FILTER_BY_TYPE, payload: resultType})
// }
export const filterByType = (filter) => {
    return {type: FILTER_BY_TYPE, payload: filter}
}

export const filterByCreated = (payload) => {
    return {type: FILTER_BY_CREATED, payload}
}

// export const filterByCreated = (query) => (dispatch, getstate) => {
//         const { pokemons } = getstate()
//         const results = pokemons.searchPokemon.filter((poke) => poke.type === query);
//      dispatch ({type: FILTER_BY_CREATED, payload: results}
// }

export const searchPokemon = (query) => (dispatch, getstate) => {
    const { pokemons } = getstate()
    const result = pokemons.searchPokemon.find((poke) => poke.name.toLowerCase().includes(query.toLowerCase()));
    dispatch({ type: SEARCH_POKEMON, payload: result})
} 
