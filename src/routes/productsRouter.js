const { Router } = require('express');

// Requerir todos los handlers
// ejemplo: const handlerProducts = require('../handlers/handlerProducts)

const { handlerGetProducts, handlerGetProductById, handlerPostProducts, handlerPutProducts, handlerDeleteProducts } = require('../handlers/productsHandlers');

const productsRouter = Router();

// Especificar todas las peticiones
// ejemplo: productsRouter.get('/', helperProducts, handlerProducts)

productsRouter.get('/', handlerGetProducts);
productsRouter.get('/:prodId',handlerGetProductById);
productsRouter.post('/',handlerPostProducts);
productsRouter.put('/',handlerPutProducts);
productsRouter.delete('/',handlerDeleteProducts)


module.exports = productsRouter;