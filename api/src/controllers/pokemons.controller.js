const { Pokemon, Type } = require("../db"); 
const fetch = require("node-fetch");

//Obtengo info de url para tener la info de la API
const getApiInfo = async () => {
    const apiUrl = await fetch.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40`)
    const data = await apiUrl.json();
    
    const db = await Pokemon.findAll({include: Type}); 
    //uso include para hacer un join entre Pokemon y Type
    
    //Concateno para unir db con la info que viene de la api
    let dataAndApi = [...db, ...data.results]

    //Aca voy a poner toda la info de todos los poke con el for
    let pokemonInfo = [];

    for(let i= 0; i< dataAndApi.length; i++){
        if(!dataAndApi[i]) return pokemonInfo;
        
        if(dataAndApi.url){ //si trabajo con info de api
            const onePokemon = await fetch(dataAndApi[i].url);
            const dataOnePokemon = await onePokemon.json();
            
            pokemonInfo.push({
                id: dataOnePokemon.forms.id,
                name: dataOnePokemon.name,
                hp: dataOnePokemon.stats[0].base_stat,
                attack: dataOnePokemon.stats[1].base_stat,
                defense: dataOnePokemon.stats[2].base_stat,
                speed: dataOnePokemon.stats[5].base_stat,
                height: dataOnePokemon.height,
                weight: dataOnePokemon.weight,
                img: dataOnePokemon.sprites.front_default,
                type: dataOnePokemon.types.type.name
            })
        } else { //si no tiene url trabajo con info de DB
            pokemonInfo.push({
                id: dataAndApi[i].id,
                name: dataAndApi[i].name,
                hp: dataAndApi[i].hp,
                attack: dataAndApi[i].attack,
                defense: dataAndApi[i].defense,
                speed: dataAndApi[i].speed,
                height: dataAndApi[i].height,
                weight: dataAndApi[i].weight,
                image: dataAndApi[i].image,
                type:  dataAndApi[i].,
            })
        }
    }
    
    return pokemonInfo;
}

export const getPokemons = async (req, res) =>{
    try{
        const pokemons = await Pokemon.findAll()
        res.json(pokemons)
    } catch(error){
        return res.status(500).json({ message: error.message })
    }
};

export const getPokemon = async (req, res) => {
    try{
        const { id, name } = req.params;
        const pokemon = await Pokemon.findOne({
            where: {
                [Op.or]: [
                    { id: id },
                    { name: name }
                ]
            }
        });
        if(!pokemon) {
            return res.status(404).json({ message: "That Pokemon does not exists." })
        }

    } catch(error){
        return res.status(500).json({ message: error.message })
    }
}

export const createPokemons = async (req, res) =>{
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

export const updatePokemons = async (req, res) =>{
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

export const deletePokemons = async (req, res) =>{
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
