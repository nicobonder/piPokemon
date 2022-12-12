export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const DELETE_POKEMON = "CREATE_POKEMON";
export const GET_TYPES = "GET_TYPES";

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
        return fetch(`http://localhost:3001/pokemon/${id}`)
        .then(res => res.json())
        .then(data => dispatch(
            {type: GET_POKEMON_DETAIL, payload: data}
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