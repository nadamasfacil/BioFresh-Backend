const { getAllOrders, getOrderById, postOrder, deleteOrder, clearOrder, putShippingOrder } = require('../controllers/ordersControllers.js');

const handlerGetAllOrders = async ( req , res ) => {
    try {
        const allOrders = await getAllOrders();
        if (allOrders.length < 1) throw Error('Orders not found');
        res.status(200).json(allOrders);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

const handlerGetOrderById = async ( req, res ) => {
    try {
        const orderId = req.params.orderId;
        const orderFound = await getOrderById(orderId);
        if (orderFound === null) throw Error('Order not Found');
        res.status(200).json(orderFound);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

const putShippingHandler = async(req, res) => {
    try{
        const {orderId, shipping} = req.body;
        const orderFound = await putShippingOrder({orderId, shipping})
        res.status(200).send(orderFound)
    } catch(error){
        res.status(404).json(error.message)
    }
}

const handlerPostOrder = async ( req , res ) => {
    try {
        const { userId } = req.body;
        const orderFound = await postOrder(userId);
        if (orderFound === null) throw Error ("Did not create order in DB");
        res.status(200).json(orderFound);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

const handlerDeleteOrders = async ( req, res ) => {
    try {
        const body = req.body;
        const idOrder = body.id;
        const status = body.status;
        const orderResult = await deleteOrder(idOrder, status);
        if ( orderResult === null) throw Error ('Could not disable order or order not found');
        res.status(200).json(orderResult);    
    } catch (error) {
        res.status(404).json(error.message);    
    }
};

const handlerClearOrders = async ( req, res ) => {
    try {
        const orderId = req.params.orderId;
        const orderResult = await clearOrder(orderId);
        if ( orderResult === null) throw Error ('Could not clear order or order not found');
        res.status(200).json(orderResult);    
    } catch (error) {
        res.status(404).json(error.message);    
    }
};

module.exports = {
    handlerGetAllOrders,
    handlerGetOrderById,
    handlerPostOrder,
    handlerDeleteOrders,
    handlerClearOrders,
    putShippingHandler
}