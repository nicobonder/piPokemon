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
  UPDATE_POKEMON,
} from "./actions";

const initialState = {
  pokemons: [],
  allPokemons: [],
  pokemonDetail: {},
  types: [],
  filterByType: [],
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

    case UPDATE_POKEMON:
      const index = state.pokemons.findIndex((poke) => poke.id === action.payload.id);
      // Creo una copia del estado y actualiza el elemento en la copia
      const newState = { ...state };
      newState.pokemons[index] = action.payload;
      // Devuelve la copia actualizada del estado
      return newState;

    case DELETE_POKEMON:
      const deleted = action.payload
      const remove = state.pokemons.filter((pokemon) => pokemon.id !== deleted
      );
      
      return {
        ...state,
        pokemons: remove
      };

    //SORTS Y FILTERS
    case SORT_BY_ALPHABET:
      const sortAlpha =
        action.payload === "a-z"
          ? state.pokemons.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
            return 0;
          })
        : state.pokemons.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return -1;
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return 1;
            }
            return 0;
          });
            console.log("state.pokemons alpha", state.pokemons);
            console.log("sortedPoke alpha", sortAlpha);
      return {
        ...state,
        pokemons: sortAlpha,
      };

    case SORT_BY_ATTACK:
      let sortedPoke =
        action.payload === "- to +"
          ? state.pokemons.sort((a, b) => {
              if (a.attack > b.attack) {
                return 1;
              }
              if (a.attack < b.attack) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort((a, b) => {
              if (a.attack > b.attack) {
                return -1;
              }
              if (a.attack < b.attack) {
                return 1;
              }
              return 0;
            });
      console.log("state.pokemons attack", state.pokemons);
      console.log("sortedPoke attack", sortedPoke);
      return {
        ...state,
        pokemons: sortedPoke,
      };

    case SEARCH_POKEMON:
      return {
        ...state,
        pokemons: action.payload,
      };

    case FILTER_BY_TYPE:
      let type = action.payload;
      console.log(action.payload);
      let allPoke = state.allPokemons;
      let pokemonFiltered = state.pokemons.filter((poke) =>
        poke.types.includes(type)
      );
      let test = action.payload === "all" ? allPoke : pokemonFiltered;

      console.log("filterByType", action.payload);
      if (pokemonFiltered.length > 0) {
        return {
          ...state,
          pokemons: test,
        };
      } else {
        return {
          ...state,
          pokemons: state.allPokemons,
        };
      }

    case FILTER_BY_CREATED:
      let created = state.allPokemons.filter((poke) => poke.createdInDB);
      let apiPoke = state.allPokemons.filter((poke) => !poke.createdInDB);
      let createdFilter = action.payload === "Data Base" ? created : apiPoke;
      return {
        ...state,
        pokemons: action.payload === "All" ? state.allPokemons : createdFilter,
      };

    case CLEAN_FILTER:
      const all = state.pokemons
      return {
        ...state,
        pokemons: all,
       
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
