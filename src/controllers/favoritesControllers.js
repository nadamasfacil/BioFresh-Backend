
const  { Favorites , Products} = require("../db");
const { Op } = require("sequelize");

 const getAllFavoritesDB = async () => {
    const allFavorites = await Favorites.findAll();
    //console.log(allFavorites.length)
    if (allFavorites.length<1) throw Error ("Did not found Favorites in DB ")
    else return allFavorites;
  }

  const getFavoritesForUserDB= async (user) => {
    const allFavoritesUser = await Favorites.findAll({
        where: {
          userEmail: user
        },
        include: [
          {
            model: Products
          }
        ]
      })
    if (allFavoritesUser.length<1) throw Error ("Did not found Favorites in DB")
    else return allFavoritesUser;

    
  }

  const changeFavoriterDB= async(userEmail,productId)=>{
    console.log('userEmail,productId: ',userEmail,productId)
   //buscar favorite que tenga el mismo user y el mismo producto
        const favFind = await Favorites.findAll(
          {
            where: {[Op.and]: [
                { userEmail: userEmail },
                { productId: productId}
            ]}
        }
       )
       // console.log('favFind.length=<<<>>',favFind.length)
        if (favFind.length<1) { //Sino se encuentra el favorito=>se crea
            await Favorites.create({ userEmail,productId })
            return "Favorite Created succesfully";
        } else {
            //SI esta creado se actualiza cambiando de estado
           // console.log('actualizando . ',favFind[0].active)
            await Favorites.update({
                active: !favFind[0].active,
            }, {
                where: {[Op.and]: [
                    { userEmail: userEmail },
                    { productId: productId}
                ]}
            });
            return "Favorite modified succesfully";
        }
  }

module.exports = {
   
    getAllFavoritesDB,
    getFavoritesForUserDB,
    changeFavoriterDB
}


// ///////////////////////////////
//anterior
//const Favorites = require("../models/Favorites");

// const getAllFavoritesController = async (req, res) => {
//     try {
//         console.log("Estoy en el controller de Favorites")
//         const favoriteFromDb = await Favorites.findAll({ where : { productFavorite : true }})
//         if(favoriteFromDb.length === 0) throw Error("No hay Favorits en la DB");
//         res.status(200).json(favoriteFromDb);
//     } catch (error) {
//         console.error('Error al mostrar los Users de la DB:', error);
//         res.status(400).json({ error: error.message });
//     }
//  }
// // const getFavorites = async () => {
// //     return await Products.findAll({ where : { productFavorite : true }}) // productFavorite seria la relación de la tabla de producto con favorito
// // }
// module.exports = {
//     getAllFavoritesController
// }