const { Router } = require('express');

const  {getAllCategoriesHandler, getCategorieByIdHandler, postCategorieHandler, deleteCategorieHanlder,putCategorieHandler} = require('../handlers/categoriesHandlers.js')

const categoriesRouter = Router();

categoriesRouter.get('/', getAllCategoriesHandler)
categoriesRouter.get('/:idCategorie', getCategorieByIdHandler)
categoriesRouter.post('/categorie', postCategorieHandler)
categoriesRouter.put("/modificacion",putCategorieHandler)
categoriesRouter.delete('/', deleteCategorieHanlder)

module.exports = categoriesRouter;
