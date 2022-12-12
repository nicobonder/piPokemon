import {
    GET_POKEMONS,
    GET_POKEMON_DETAIL,
    CREATE_POKEMON,
    DELETE_POKEMON,
    GET_TYPES
} from './actions'

const initialState = {
    pokemons: [],
    pokemonDetail: {},
    types: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return{
                ...state,
                pokemons: action.payload,
            }
        case GET_POKEMON_DETAIL:
            return{
                ...state,
                pokemonDetail: action.payload
            }
        case CREATE_POKEMON:
            return{
                ...state,
                pokemons: state.pokemons.concat(action.payload)
            }
        case DELETE_POKEMON:
            return{
                ...state,
                pokemons: state.pokemons.filter((pokemon) => pokemon.id !== action.payload) 
            }
        case GET_TYPES:
            return{
                ...state,
                types: action.payload
            }
        default: return {...state}
    }
};

export default rootReducer;
