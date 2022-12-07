const Type = require('../models/Type');
const Pokemon = require('../models/Pokemon');
const axios = require('axios');

export const getTypes = async (req, res) =>{
    try{
        const types = await Type.findAll()
        res.json(types)
    } catch(error){
        return res.status(500).json({ message: error.message })
    }
};

export const getType = async (req, res) => {
    try{
        const { id } = req.params;
        const type = await Type.findByPk(id);
        if(!type) {
            return res.status(404).json({ message: "That type does not exists." })
        }

    } catch(error){
        return res.status(500).json({ message: error.message })
    }
}

export const getPokemonsByType = async (req, res) => {
    const { id } = req.params;
    const pokemons = await Pokemon.findAll({
        where: { typeId: id }
        //NO SE SI FUNCIONARA PORQUE EN LA TABLA Q UNE LOS MODELOS HAY pokemonId, pero no typeId
    });
    res.json(pokemons);
}