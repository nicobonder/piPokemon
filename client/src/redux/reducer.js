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
  SEARCH_POKEMON,
  CLEAN_FILTER,
} from "./actions";

const initialState = {
  pokemons: [],
  allPokemons: [],
  pokemonDetail: {},
  types: [],
  filterByType: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case GET_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: action.payload,
      };
    
    case SEARCH_POKEMON:
      let found = state.pokemons.find((poke) => poke.name === action.payload)
      console.log('found reducer', found)
      return {
        ...state,
        pokemons: found,
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case CREATE_POKEMON:
      const name = action.payload.data.name;
      const speed = action.payload.data.speed;
      const hp = action.payload.data.hp;
      const height = action.payload.data.height;
      const weight = action.payload.data.weight;
      const attack = action.payload.data.attack;
      const defense = action.payload.data.defense;
      const createdInDB = action.payload.data.createdInDB;
      const types = action.payload.data.types;
      const img = action.payload.data.img;

      return {
        ...state,
        pokemons: state.pokemons.concat({
          name,
          speed,
          hp,
          height,
          weight,
          attack,
          defense,
          createdInDB,
          types,
          img,
        }),
      };
    case DELETE_POKEMON:
      return {
        ...state,
        pokemons: state.pokemons.filter(
          (pokemon) => pokemon.id !== action.payload
        ),
      };

      //SORTS Y FILTERS
    case SORT_BY_ALPHABET:
      const sortAlpha =
        action.payload === "a-z"
          ? state.pokemons.sort((a, b) => {
              return a.name.toLowerCase() > b.name.toLowerCase();
            })
          : state.pokemons.sort((a, b) => {
              return a.name.toLowerCase() < b.name.toLowerCase();
            });
      return {
        ...state,
        pokemons: sortAlpha,
      };

    case SORT_BY_ATTACK:
      let sortedPoke = action.payload === "- to +" ? state.pokemons.sort((a, b) => {
          if(a.attack > b.attack){return 1;} if(a.attack < b.attack){return -1;} return 0;}) : state.pokemons.sort((a, b) => {if(a.attack > b.attack){return -1;} if(a.attack < b.attack){return 1;} return 0;});
          console.log('antes', state.pokemons)
      return {
          ...state,
          pokemons: sortedPoke,
        }
      

    case FILTER_BY_TYPE:
      let type = action.payload;
      console.log(action.payload)
      let allPoke = state.allPokemons;
      let pokemonFiltered = state.pokemons.filter((poke) => poke.types.includes(type))  
      let test = action.payload === 'all' ? allPoke : pokemonFiltered

      console.log("filterByType", action.payload);
      if(pokemonFiltered.length > 0){
        return {
          ...state,
          pokemons: test}
      } else {
        return{
          ...state, 
          pokemons: state.allPokemons
        }
      }

    case FILTER_BY_CREATED:
     let created = state.allPokemons.filter((poke) => poke.createdInDB)
     let apiPoke = state.allPokemons.filter((poke) => !poke.createdInDB)
     let createdFilter = action.payload === 'Data Base' ? created : apiPoke 
     return {
      ...state,
      pokemons: action.payload === 'All' ? state.allPokemons : createdFilter
    }

    case CLEAN_FILTER: 
    return{
      ...state,
      pokemons: state.pokemons,
      types: state.types,
      filterByType: state.filterByType 
    }
    default:
      return { ...state };
  }
};

export default rootReducer;

// case SORT_BY_ATTACK:
//     const sortAttack = action.payload
//     if(sortAttack === "- to +")
//     return {
//         ...state,
//         pokemons: state.pokemons.sort((a, b) => a.attack > b.attack)}
//     else if(sortAttack === "+ to -")
//         return {
//             ...state,
//             pokemons: state.pokemons.sort((a, b) => a.attack < b.attack)
//         }
//     break;

// case SORT_BY_ATTACK:
//         const sortAsc = state.pokemons.sort((a, b) => a.attack > b.attack)
//         const sortDes = state.pokemons.sort((a, b) => a.attack < b.attack)
//         const sortAttack = action.payload
//             if(sortAttack === "- to +")
//             return {
//                 ...state,
//                 pokemons: sortAsc
//             }
//             else if(sortAttack === "+ to -")
//                 return {
//                     ...state,
//                     pokemons: sortDes
//                 }
//             break;



//antes de stackoverflow
//SORTS Y FILTERS
// case SORT_BY_ALPHABET:
//   const sortAlpha =
//     action.payload === "a-z"
//       ? state.pokemons.sort((a, b) => {
//           return a.name.toLowerCase() > b.name.toLowerCase();
//         })
//       : state.pokemons.sort((a, b) => {
//           return a.name.toLowerCase() < b.name.toLowerCase();
//         });
//   return {
//     ...state,
//     pokemons: sortAlpha,
//   };

// case SORT_BY_ATTACK:
//   let sortedPoke = action.payload === "- to +" ? state.pokemons.sort((a, b) => {
//       if(a.attack > b.attack){return 1;} if(a.attack < b.attack){return -1;} return 0;}) : state.pokemons.sort((a, b) => {if(a.attack > b.attack){return -1;} if(a.attack < b.attack){return 1;} return 0;});
//       console.log('antes', state.pokemons)
//   return {
//       ...state,
//       pokemons: sortedPoke,
//     }
  

// case FILTER_BY_TYPE:
//   let type = action.payload;
//   console.log(action.payload)
//   let allPoke = state.allPokemons;
//   let pokemonFiltered = state.pokemons.filter((poke) => poke.types.includes(type))  
//   let test = action.payload === 'all' ? allPoke : pokemonFiltered

//   console.log("filterByType", action.payload);
//   if(pokemonFiltered.length > 0){
//     return {
//       ...state,
//       pokemons: test}
//   } else {
//     return{
//       ...state, 
//       pokemons: state.allPokemons
//     }
//   }

// case FILTER_BY_CREATED:
//  let created = state.pokemons.filter((poke) => poke.createdInDB)
//  let apiPoke = state.allPokemons.filter((poke) => !poke.createdInDB)
//  let createdFilter = action.payload === 'Data Base' ? created : apiPoke 
//  return {
//   ...state,
//   pokemons: action.payload === 'All' ? state.allPokemons : createdFilter
// }

// case CLEAN_FILTER: 
// return{
//   ...state,
//   pokemons: state.pokemons,
// }
// default:
//   return { ...state };
// }
// };