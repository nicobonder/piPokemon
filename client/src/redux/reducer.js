import {
    GET_POKEMONS,
    GET_POKEMON_DETAIL,
    CREATE_POKEMON,
    DELETE_POKEMON,
    GET_TYPES,
    SORT_BY_ALPHABET,
    SORT_BY_ATTACK,
    FILTER_BY_CREATED,
    FILTER_BY_TYPE,
    SEARCH_POKEMON
} from './actions'

const initialState = {
    pokemons: [],
    pokemonDetail: {},
    types: [],
    filterByType: null,
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
            const name = action.payload.data.name 
            const speed = action.payload.data.speed
            return{
                ...state,
                //pokemons: state.pokemons.concat({action.payload.data.name, action.payload.data.speed })
                pokemons: state.pokemons.concat({name, speed})
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
        case SORT_BY_ALPHABET:
            let sortAlpha = action.payload === 'asc' ?
            state.pokemons.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if(b.name.toLowerCase() > a.name.toLowerCase()) {
                    return -1;
                }
                return 0;
            }) :
            state.pokemons.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                }
                if(b.name.toLowerCase() > a.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
            pokemons: sortAlpha,
        }
        case SORT_BY_ATTACK:
            let sortAttack = action.payload === 'max' ?
            state.pokemons.sort(function(a, b){
                if(a.attack < b.attack) {
                    return 1;
                }
                if(b.attack < a.attack) {
                    return -1;
                }
                return 0;
            }) :
            state.pokemons.sort(function(a, b){
                if(a.attack < b.attack) {
                    return -1;
                }
                if(b.attack < a.attack) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                pokemons: sortAttack,
        }
        case FILTER_BY_TYPE:
            console.log('filterByType', action.payload)
        return{
            ...state,
            filterByType: action.payload
        }
        case FILTER_BY_CREATED:
            const allPokemons = state.pokemons
            const createdFilter = action.payload === 'Data Base' ? 
            allPokemons.filter(poke => poke.createdInDB) :
            allPokemons.filter(poke => !poke.createdInDB)
        return{
            ...state,
            pokemons: action.payload === 'All' ?
                state.pokemons : createdFilter
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


/*
        case FILTER_BY_TYPE:
            console.log('filterByType', action.payload)
        return{
            ...state,
            filterByType: action.payload
        }*/