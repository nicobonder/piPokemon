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
  error: null
  //filterByType: [],
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
      const index = state.pokemons.findIndex(
        (poke) => poke.id === action.payload.id
      );
      // Creo una copia del estado y actualiza el elemento en la copia
      const newState = { ...state };
      newState.pokemons[index] = action.payload;
      // Devuelve la copia actualizada del estado
      return newState;

    case DELETE_POKEMON:
      const deleted = action.payload;
      const remove = state.pokemons.filter((pokemon) => pokemon.id !== deleted);

      return {
        ...state,
        pokemons: remove,
      };

    //SORTS Y FILTERS
    case FILTER_BY_CREATED:
      let allPoke1 = state.allPokemons; //todos los poke
      let created = state.pokemons.filter((poke) => poke.createdInDB); //filtro los q tienen la prop createdInDB
      let apiPoke = state.pokemons.filter((poke) => !poke.createdInDB); //filtro los q NO tienen la prop createdInDB
      let createdFilter = action.payload === "Data Base" ? created : apiPoke; //el ternario hace que al aplicar el filtro 
                                                //si se cumple muestra los creados y si es false muestra los que vienen de la API
      return {
        ...state,                                 //el state pokemons tiene un ternario q si el value es All muestra todos los poke
        pokemons: action.payload === "All" ? allPoke1 : createdFilter, //si no, muestra el resultado de createdFilter
      };                                                                        

    case FILTER_BY_TYPE:
      let type = action.payload;
      let allPoke = state.allPokemons; //todos los poke
      let pokemonFiltered = state.pokemons.filter((poke) =>
        poke.types.includes(type) //los poke que tengan el type elegido
      ); //si elijo All muestr todos los poke y si no, muestro los q coinciden con el filtro
      let test = action.payload === "all" ? allPoke : pokemonFiltered;

      if (pokemonFiltered.length > 0) {
        return {
          ...state,
          pokemons: test,
        };
      } else {
        console.log('yamil')
        return {
          ...state, //si no hay ningun poke con ese type, muestro todos los poke
          pokemons: state.allPokemons,
        };
      }

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
      return {
        ...state,
        pokemons: sortedPoke,
      };

    case SEARCH_POKEMON:
      return {
        ...state,
        pokemons: action.payload,
      };

    case CLEAN_FILTER:
      const all = state.pokemons;
      return {
        ...state,
        pokemons: all,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
