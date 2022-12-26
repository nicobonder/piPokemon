const axios = require('axios');
const { Pokemon, Type } = require("../db"); 

//Obtengo info de url para tener la info de la API
const getApiInfo = async () => {
    //Aca voy a poner toda la info de todos los poke con el forEach
    let pokemonsApi = [];

    //Traigo name y url de los primeros 40 poke
    const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40`)
        
    //pusheo el contenido de cada poke en pokemonsApi
    apiUrl.data.results.forEach(el => {
        pokemonsApi.push(axios.get(el.url) //necesito ingresar al url de cada uno para tener los detalles de los poke
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
            types: poke.types.map(el => el.type.name), //para cada poke va a ir a [types] y va a mapear y devolver el nombre del type q tenga ese poke
        }
        return infoPoke;
    }))
    return await apiInfo   
}

//VER SI HACE FALTA USAR attributes
const getDBInfo = async () => {
    const infoDB = await Pokemon.findAll({include: 'types'});
    console.log('infodb')
    const newInfo = infoDB.map((poke) => {
        const obj = 
        {
            id: poke.dataValues.id, 
            name: poke.dataValues.name,
            hp: poke.dataValues.hp,
            attack: poke.dataValues.attack,
            defense: poke.dataValues.defense,
            speed: poke.dataValues.speed,
            height: poke.dataValues.height,
            weight: poke.dataValues.weight,
            img: poke.dataValues.img,
            types: poke.dataValues.types.map((t) => t.dataValues.name)
        }

        const lostypes = poke.dataValues.types.map((t) => t.dataValues.name)
        console.log('map de types', lostypes)
        console.log('el type de db', poke.dataValues.types)
    return obj
    });

    console.log('new info', newInfo)

    return newInfo

    //{id: el.dataValues.id, name: el.dataValues.name})
}

const getAllPokemons = async () => {
    let allPokemons = [];
    let apiPokemons =  await getApiInfo();
    let dbPokemons = await getDBInfo();

    //Concateno para unir db con la info que viene de la api
    allPokemons = [...apiPokemons, ...dbPokemons];
    //console.log('All pokemons:', allPokemons)
    return allPokemons
}

const createPokemon = async (req, res) =>{
  const { name, img, attack, defense, speed, hp, height, weight, types, createdInDB } = req.body;
  try{
    let newPokemon = await Pokemon.create({ 
        //id
        name, 
        img,
        attack, 
        defense, 
        speed, 
        hp, 
        height, 
        weight,
        createdInDB
    });
   // Dentro del modelo Type busco los types que coincidan con los que vienen por body
    let typeDB = await Type.findAll(
        {   
            where: {                       
                    name: types,
                }
            }
        )
       // asocio el nuevo poke con el type q traje de DB. add es un metodo de sequelize para asociar modelos.
        await newPokemon.addTypes(typeDB); 
        res.json(newPokemon)
        
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
    createPokemon,
    deletePokemons,
    //getPokemonById,
    //getPokemonByName
}
