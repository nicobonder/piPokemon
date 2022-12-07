const { 
    getPokemons, 
    createPokemons, 
    updatePokemons, 
    deletePokemons, 
    getPokemon
} = require('../controllers/pokemons.controller');

const router = require("express").Router();
const axios = require('axios');

router.get('/pokemons', getPokemons);
//Ruta de creacion
router.post('/pokemons', createPokemons);
//Ruta ruta para actualizar un proyecto
router.put('/pokemons/:id', updatePokemons);
//Ruta para borrar un proyecto
router.delete('/pokemons/:id', deletePokemons);
//Ruta para traer el detalle del poke con el id de params
router.get('/pokemons/:id', getPokemon);

module.exports = router;