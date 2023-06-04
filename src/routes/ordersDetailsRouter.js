const { Router } = require('express');

// Requerir todos los handlers
// ejemplo: const handlerOrders = require('../handlers/handlerOrders)

const { handlerGetAllOrdersDetails, handlerGetOrderDetailById, handlerPostOrderDetail, handlerPutOrdersDetails, handlerDeleteOrdersDetails } = require('../handlers/ordersDetailsHandlers');

// Requerir todos los middlewares para validar datos
// ejemplo: const helperOrders = require('../helpers/handlerOrders)




const ordersDetailsRouter = Router();

// Especificar todas las peticiones
// ejemplo: ordersRouter.get('/', helperOrders, handlerOrders)

ordersDetailsRouter.get("/", handlerGetAllOrdersDetails);
ordersDetailsRouter.get('/:orderId', handlerGetOrderDetailById);
ordersDetailsRouter.post("/", handlerPostOrderDetail);
ordersDetailsRouter.put('/', handlerPutOrdersDetails);
ordersDetailsRouter.delete('/',handlerDeleteOrdersDetails);





module.exports = ordersDetailsRouter;
