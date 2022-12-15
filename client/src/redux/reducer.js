import {
    GET_POKEMONS,
    GET_POKEMON_DETAIL,
    CREATE_POKEMON,
    DELETE_POKEMON,
    GET_TYPES,
    SORT_BY_ALPHABET_ASC,
    SORT_BY_ALPHABET_DES,
    SORT_BY_ATTACK_ASC,
    SORT_BY_ATTACK_DES,
    FILTER_BY_CREATED,
    FILTER_BY_TYPE,
    SEARCH_POKEMON
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
        case SORT_BY_ALPHABET_ASC:
            const sortAsc  = action.payload.sort((a, b) => (a.name < b.name ? 1 : a.name > b.name ? -1 : 0)); 
        return{
            ...state,
            pokemons: sortAsc,
        }
        case SORT_BY_ALPHABET_DES:
            const sortDes  = action.payload.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)); 
        return{
            ...state,
            pokemons: sortDes
        }
        case SORT_BY_ATTACK_ASC:
            const sortAttackAsc  = action.payload.sort((a, b) => (a.attack < b.attack ? 1 : a.attack > b.attack ? -1 : 0)); 
            return{
                ...state,
                pokemons: sortAttackAsc,
        }
        case SORT_BY_ATTACK_DES:
            const sortAttackDes  = action.payload.sort((a, b) => (a.attack < b.attack ? -1 : a.attack > b.attack ? 1 : 0));
        return{
            ...state,
            pokemons: sortAttackDes
        }
        case FILTER_BY_TYPE:
        return{
            ...state,
            pokemons: action.payload
        }
        case FILTER_BY_CREATED:
        return{
            ...state,
            pokemons: action.payload
        }
        case SEARCH_POKEMON:
            return {
                ...state,
                pokemons: action.payload
            }
        default: return {...state}
    }
};

export default rootReducer;
