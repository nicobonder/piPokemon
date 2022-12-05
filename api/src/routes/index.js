const { Router } = require('express');
const { response } = require('../app');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Ruta para traer todos los poke o solo el que piden por nombre
router.get('/pokemons', (req, res) => {
    const { name } = req.query;
    if(!name) return res.status(200).json() //mandar a una pagina con un mensaje de error

    return res.status(200).json() //mandar el poke con ese nombre
})

//Ruta para traer el detalle del poke con el id de params
router.get('/pokemons/:id', (req, res) => {
    const { id } = req.params;
})

//Ruta de creacion
router.post('/pokemons', (req, res) =>{
    const { name, attack, defense, speed, hp, height, weight } = req.body;
    
})




module.exports = router;
