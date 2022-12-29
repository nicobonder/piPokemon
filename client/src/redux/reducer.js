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

        case GET_TYPES:
            return{
                ...state,
                types: action.payload
            }
        case CREATE_POKEMON:
            const name = action.payload.data.name 
            const speed = action.payload.data.speed
            const hp = action.payload.data.hp
            const height = action.payload.data.height
            const weight = action.payload.data.weight
            const attack = action.payload.data.attack
            const defense = action.payload.data.defense
            const createdInDB = action.payload.data.createdInDB
            const types = action.payload.data.types
            const img = action.payload.data.img

            return{

                ...state,
                //pokemons: state.pokemons.concat({action.payload.data.name, action.payload.data.speed })
                pokemons: state.pokemons.concat({name, speed, hp, height, weight, attack, defense, createdInDB, types, img})
            }
        case DELETE_POKEMON:
            return{
                ...state,
                pokemons: state.pokemons.filter((pokemon) => pokemon.id !== action.payload) 
            }
       
        case SORT_BY_ALPHABET:
            const sortAlpha = action.payload === "a-z" ?
            state.pokemons.sort((a, b) => {
               return a.name.toLowerCase() > b.name.toLowerCase()
            }) :
            state.pokemons.sort((a, b) => {
                return a.name.toLowerCase() < b.name.toLowerCase();
            });
            return {
                ...state,
            pokemons: sortAlpha
        }

        case SORT_BY_ATTACK:
            const sortAttack = action.payload
            if(sortAttack === "- to +")
            return {
                ...state,
                pokemons: state.pokemons.sort((a, b) => a.attack > b.attack)} 
            else if(sortAttack === "+ to -")
                return {
                    ...state, 
                    pokemons: state.pokemons.sort((a, b) => a.attack < b.attack)
                }
            break;
            
        case FILTER_BY_TYPE:
            console.log('filterByType', action.payload)
        return{
            ...state,
            filterByType: action.payload
        }

        case FILTER_BY_CREATED:
            let created = state.pokemons.filter(p=> typeof p.id === 'string')
            let api = state.pokemons.filter(p=> typeof p.id === 'number')
            if(action.payload === 'DataBase'){
                console.log('action.payload is', action.payload)
                return{
                    ...state,
                    pokemons: created
                }
            } else if(action.payload === 'API'){
                console.log('action.payload is', action.payload)
                return {
                    ...state,
                    pokemons: api
                }
            } else if(action.payload === 'All'){
                console.log('action.payload is', action.payload)
                return {
                    ...state,
                    pokemons: state.pokemons
                }
            }
            break

        case SEARCH_POKEMON:
            return {
                ...state,
                pokemons: action.payload
            }
        default: return {...state}
    }
};

export default rootReducer;
