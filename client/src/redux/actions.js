export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const DELETE_POKEMON = "CREATE_POKEMON";
export const GET_TYPES = "GET_TYPES";

//Filtos y ordenamiento
export const SORT_BY_ALPHABET_ASC = "SORT_BY_ALPHABET_ASC";
export const SORT_BY_ALPHABET_DES = "SORT_BY_ALPHABET_DES";
export const SORT_BY_ATTACK_ASC = "SORT_BY_ATTACK_ASC";
export const SORT_BY_ATTACK_DES = "SORT_BY_ATTACK_DES";

export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";

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
    //pokemon.id = id++;
    return{ type: CREATE_POKEMON, payload: pokemon}
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
            pokemons.map((pokemon) => types.push(pokemon.ship))
            dispatch ({type: GET_TYPES, payload: types})

        }
        )
    }
};

export const sortByAlphabetAsc = (pokemons) => {
    //const { rootReducer } = getstate()
    return ({type: SORT_BY_ALPHABET_ASC, payload: pokemons});
}

export const sortByAlphabetDes = (pokemons) => {
    return {type: SORT_BY_ALPHABET_DES, payload: pokemons}
}

export const sortByAttackAsc = (pokemons) => {
    return {type: SORT_BY_ATTACK_ASC, payload: pokemons}
}

export const sortByAttackDes = (pokemons) => {
    return {type: SORT_BY_ATTACK_DES, payload: pokemons}
}

export const filterByType = (query) => (dispatch, getstate) => {
    const { pokemons } = getstate()
    
    let resultType = pokemons.filter((p) => p.type.toLowerCase().includes(query.toLowerCase()))

    dispatch ({type: FILTER_BY_TYPE, payload: resultType})
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
