const { Router } = require("express");
const router = Router();


const { 
    getAllPokemons,
    createPokemon, 
    updatePokemons, 
    deletePokemons, 
    //getPokemonById,
    //getPokemonByName,
} = require('../controllers/pokemons.controller.js');

//const router = require("express").Router();

router.get('/', async (req, res) => {
    const { name } = req.query;
    //Obtengo todos los pokemons con la funcion getAllPokemons
    let allPokemons = await getAllPokemons();
    try{
        if(name){
            let pokeName = allPokemons.filter((poke) => poke.name.toLowerCase() === name.toLowerCase())
            if(pokeName.length){
                res.status(200).send(pokeName)
            } else {
                res.status(404).send('I am sorry, we couldnt find that pokemon.');
            }
        } else {
            res.status(200).send(allPokemons)
        }
    } catch(error){
        return res.status(500).json({ message: error.message })
    }
});

//Ruta para traer el detalle del poke con el id de params
router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    const pokeById = await getAllPokemons(); //traigo todos los poke

    if(id){ //si me pasaron un id valido, filtro y devuelvo
        let pokeName = pokeById.filter(poke => poke.id == id)
        pokeName.length ? res.status(200).json(pokeName) : res.status(404).send('I am sorry, we couldnt find that pokemon.');  //si el id no es valido devuelvo mensaje.
        }
});


//Ruta de creacion
router.post('/', (createPokemon));
//Ruta ruta para actualizar un proyecto
router.put('/:id', updatePokemons);
//Ruta para borrar un proyecto
router.delete('/:id', deletePokemons);

module.exports = router;