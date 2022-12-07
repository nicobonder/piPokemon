const router = require("express").Router();
const Type = require('../models/Type');
const axios = require('axios');
const { getTypes, getType, getPokemonsByType } = require("../controllers/types.controller");


//Ruta para obtener todos los types
router.get('/tyes', getTypes);

//Ruta para obtener un type
router.get('/tyes/:id', getType);

//Obtener todos los pokemons de una type.
router.get('/types/:id/pokemons', getPokemonsByType);

module.exports = router;