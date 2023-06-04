const { Router } = require('express');

// Requerir todos los handlers
// ejemplo: const handlerProducts = require('../handlers/handlerProducts)

const { getDeliveriesHandlers } = require('../handlers/deliveriesHandlers.js')

const deliveriesRouter = Router();

deliveriesRouter.get('/', getDeliveriesHandlers);


module.exports = deliveriesRouter;