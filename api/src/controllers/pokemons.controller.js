const axios = require('axios');
const { Pokemon, Type } = require("../db"); 

//Obtengo info de url para tener la info de la API
const getApiInfo = async () => {
    //Aca voy a poner toda la info de todos los poke con el forEach
    let pokemonsApi = [];

    //Traigo name y url de los primeros 40 poke
    const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40`)
    //const data = await apiUrl.json();
        
    //pusheo el contenido de cada poke en pokemonsApi
    apiUrl.data.results.forEach(el => {
        pokemonsApi.push(axios.get(el.url)
        .then(res => res.data)
        )
    })

    const apiInfo = Promise.all(pokemonsApi)
    .then(res => res.map(poke => { //tomo la respuesta de la promesa y para cada poke busco la info necesaria
        const infoPoke = { 
            id: poke.id,
            name: poke.name,
            hp: poke.stats[0].base_stat,
            attack: poke.stats[1].base_stat,
            defense: poke.stats[2].base_stat,
            speed: poke.stats[5].base_stat,
            height: poke.height,
            weight: poke.weight,
            img: poke.sprites.other.dream_world.front_default,
            type: poke.types.map(el => el.type.name), //para cada poke va a ir a tyes y va a mapear y devolver el nombre del type q tenga ese poke
        }
        return infoPoke;
    }))
    return await apiInfo   
}

//VER SI HACE FALTA USAR attributes
const getDBInfo = async () => {
    return await Pokemon.findAll({include: Type});     
    
}

const getAllPokemons = async () => {
    let allPokemons = [];
    let apiPokemons =  await getApiInfo();
    let dbPokemons = await getDBInfo();

    //Concateno para unir db con la info que viene de la api
    allPokemons = [...apiPokemons, ...dbPokemons];
    console.log('All pokemons:', allPokemons)
    return allPokemons
}

// const getPokemonById = async () => {
//     try{
//         const { id  } = req.params;
//         let apiPokemons =  await getApiInfo();

//         //veo si ese id existe en api para ver si trabajo con api o con db
//        if(apiPokemons.find((a) => a.id === id)){
//             const pokemonInApi = apiPokemons.filter((a) => a.id === id)
            
//             res.json(pokemonInApi);
//             if(!pokemonInApi) {
//                 return res.status(404).json({ message: "That Pokemon does not exists." })
//             }
//         } else {
//             const pokemonInDb = await Pokemon.findOne({
//                 where:
//                 { id: id },            
//             });
//             res.json(pokemonInDb);
//             if(!pokemonInDb) {
//                 return res.status(404).json({ message: "That Pokemon does not exists." })
//             }
//         }
//     } catch(error){
//         return res.status(500).json({ message: error.message })
//     }
// }


const createPokemons = async (req, res) =>{
  const { id, name, attack, defense, speed, hp, height, weight } = req.body;
  try{
    const newPokemon = await Pokemon.create({
        id, 
        name, 
        attack, 
        defense, 
        speed, 
        hp, 
        height, 
        weight,
    });
    res.json(newPokemon);
  } catch(error){
        return res.status(500).json({ message: error.message })
    }
}

//SOLO SIRVE PA ACTUALIZAR LOS De LA DB. VER COMO HACER PARA Q SIRVA PARA API
const updatePokemons = async (req, res) =>{
    try {
        const { id } = req.params;
        const { name, attack, defense, speed, hp, height, weight } = req.body;
        //Busco un poke por su id
        const pokemon = await Pokemon.findByPk(id);
        //lo actualizo con los valores que recibo por body.
        pokemon.name = name;
        pokemon.attack = attack;
        pokemon.defense = defense;
        pokemon.speed = speed;
        pokemon.hp = hp;
        pokemon.height = height;
        pokemon.weight = weight;
        //lo guardo y lo devuelvo
        await pokemon.save();
        res.json(pokemon);

    } catch(error){
        return res.status(500).json({ message: error.message })
    }
}

const deletePokemons = async (req, res) =>{
    try{
        const { id } = req.params;
        await Pokemon.destroy({
            where: {
                id,
            },
        });
        res.sendStatus(204);
    } catch(error){
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllPokemons,
    updatePokemons,
    createPokemons,
    deletePokemons,
    //getPokemonById,
    //getPokemonByName
}
