const { Router } = require("express");
const router = Router();


const { 
    getAllPokemons,
    createPokemons, 
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
    const { id  } = req.params;
    let pokeById = await getAllPokemons(); //traigo todos los poke
    try{
        if(id){ //si me pasaron un id valido, filtro y devuelvo
            let pokeName = pokeById.find((poke) => poke.id === id)
            if(pokeName.length){
                res.status(200).send(pokeName)
            } else { //si el id no es valido devuelvo mensaje.
                res.status(404).send('I am sorry, we couldnt find that pokemon.');
            }
        }
    } catch(error){
        return res.status(500).json({ message: error.message })
    }
});


//Ruta de creacion
router.post('/', createPokemons);
//Ruta ruta para actualizar un proyecto
router.put('/:id', updatePokemons);
//Ruta para borrar un proyecto
router.delete('/:id', deletePokemons);

module.exports = router;