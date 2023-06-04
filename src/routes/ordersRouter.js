const { Router } = require('express');

// Requerir todos los handlers
// ejemplo: const handlerOrders = require('../handlers/handlerOrders)
const { handlerGetAllOrders, handlerPostOrder, handlerDeleteOrders, handlerGetOrderById, handlerClearOrders, putShippingHandler } = require("../handlers/ordersHandlers.js")


// Requerir todos los middlewares para validar datos
// ejemplo: const helperOrders = require('../helpers/handlerOrders)




const ordersRouter = Router();

// Especificar todas las peticiones
// ejemplo: ordersRouter.get('/', helperOrders, handlerOrders)

ordersRouter.get("/", handlerGetAllOrders);
ordersRouter.get('/:orderId', handlerGetOrderById);
ordersRouter.post("/", handlerPostOrder);
ordersRouter.delete('/',handlerDeleteOrders);
ordersRouter.delete('/:orderId',handlerClearOrders);
ordersRouter.put('/shipping', putShippingHandler);




module.exports = ordersRouter;
