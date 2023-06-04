const { Router } = require('express');

// Aquí requerir las rutas en constantes de sus archivos respectivos
// ejemplo: const usersRouter = require('./usersRouter)

const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');
const productsRouter = require('./productsRouter');
const ordersRouter = require('./ordersRouter');
const deliveriesRouter = require('./deliveriesRouter')
const ordersDetailsRouter = require('./ordersDetailsRouter');
const favoritesRouter = require('./favoritesRouter');
const paymentsRouter = require('./paymentsRouter');

const mainRouter = Router()


// Configurar los routers
// ejemplo mainRouter.use('/users', usersRouter)

//! Rutas para correr en local
mainRouter.use('/users', usersRouter);
mainRouter.use('/categories', categoriesRouter);
mainRouter.use('/products', productsRouter);
mainRouter.use('/orders', ordersRouter);
mainRouter.use('/ordersDetails', ordersDetailsRouter)
mainRouter.use('/deliveries', deliveriesRouter);
mainRouter.use('/favorites', favoritesRouter);
mainRouter.use('/payments', paymentsRouter);

//! Rutas para correr en el server
/*mainRouter.use('/backend/users', usersRouter);
mainRouter.use('/backend/categories', categoriesRouter);
mainRouter.use('/backend/products', productsRouter);
// mainRouter.use('/orders', ordersRouter);
mainRouter.use('/backend/favorites', favoritesRouter);*/


module.exports = mainRouter;