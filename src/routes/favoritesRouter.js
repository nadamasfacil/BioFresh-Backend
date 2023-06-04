const { Router } = require('express');
//const {getAllFavoritesController} =require('../controllers/favoritesControllers')
const { getAllFavoritesHandler, getFavoritesForUserHandler,postChangeFavoriteHandler }=require('../handlers/favoritesHandlers')

const favoritesRouter = Router();

favoritesRouter.get('/', getAllFavoritesHandler);
favoritesRouter.get('/:user', getFavoritesForUserHandler);
favoritesRouter.post('/', postChangeFavoriteHandler); //crea favorite o modifica el estado del favorite
                                                      //por body requiere producto y usuario  

module.exports = favoritesRouter;
