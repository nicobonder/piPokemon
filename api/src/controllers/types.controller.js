// const Type = require('../models/Type');
// const Pokemon = require('../models/Pokemon');


// //Obtener todos los tipos de pokemons posibles
// //En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
// //1 traer de api
// //2 pushear a db

// const getTypes = async () =>{
//     //Traigo todos los types
//     const apiUrl = await axios.get(`https://pokeapi.co/api/v2/type`)

//     //De la info q trae la url solo necesito los names
//     const types = apiUrl.data.results.map(el => {
//        el.name
//     })
//     //en apiTypes tengo guardado todos los types. Tengo q pasarlos a la db
//     //type es el name de cada type
//     types.forEach(type =>{
//         Type.findOrCreate({
//             where: {
//                 name: type,
//             }
//         })
//     });
//     //Ya tengo creados todos los types en la db. Tengo que guardarlos
//     const allTypes = await Type.findAll()
//     //Y los retorno
//     return allTypes;
// };

//     const getType = async (req, res) => {
//     try{
//         const { id } = req.params;
//         const type = await Type.findByPk(id);
//         if(!type) {
//             return res.status(404).json({ message: "That type does not exists." })
//         }

//     } catch(error){
//         return res.status(500).json({ message: error.message })
//     }
// }

// //     //***Tal vez este filtrado se haga en el front
// //     const getPokemonsByType = async (req, res) => {
// //     const { id } = req.params;
// //     const pokemons = await Pokemon.findAll({
// //         where: { typeId: id }
// //         //NO SE SI FUNCIONARA PORQUE EN LA TABLA Q UNE LOS MODELOS HAY pokemonId, pero no typeId
// //     });
// //     res.json(pokemons);
// // }

// module.exports = {
//     getTypes,
//     getType,
//     //getPokemonsByType
// }