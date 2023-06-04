const { Router } = require('express');

// Requerir todos los handlers
// ejemplo: const handlerProducts = require('../handlers/handlerProducts)

const { paymentHandler , paySuccessHandler , getAllPaymentsHandler} = require("../handlers/paymentsHandlers.js");

const paymentsRouter = Router();

paymentsRouter.get('/', getAllPaymentsHandler )
paymentsRouter.get('/success', paySuccessHandler);
paymentsRouter.post('/', paymentHandler);
// paymentsRouter.post('/notifications', paymentNotificationHandler);

module.exports = paymentsRouter;