const { getAllOrdersDetails, getOrderDetailsById, postOrderDetail, putOrderDetail, deleteOrderDetail } = require("../controllers/ordersDetailsController");

const handlerGetAllOrdersDetails = async ( req , res ) => {
    try {
        const orderId = req.body.orderId;
        const allOrdersDetails = await getAllOrdersDetails(orderId);
        if (allOrdersDetails.length < 1) throw Error('Orders details not found');
        res.status(200).json(allOrdersDetails);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

const handlerGetOrderDetailById = async ( req, res ) => {
    try {
        const orderDetailId = req.params.orderId;
        const orderDetailFound = await getOrderDetailsById(orderDetailId);
        if (orderDetailFound === null) throw Error('Order details not Found');
        res.status(200).json(orderDetailFound);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

const handlerPostOrderDetail = async ( req , res ) => {
    try {
        const body = req.body;
        const orderDetail = {
            idOrder : body.idOrder,
            idProduct : body.idProduct,
            units: body.units,
        };
        const orderDetailFound = await postOrderDetail(orderDetail);
        if (orderDetailFound === null) throw Error ("Did not create order detail");
        res.status(200).json(orderDetailFound);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

const handlerPutOrdersDetails = async ( req, res ) => {
    try {
        const body = req.body;
        const orderDetail = {
            idDetail: body.idDetail,
            units: body.units,
        };
        const orderDetailFound = await putOrderDetail(orderDetail);
        if (orderDetailFound === null) throw Error('Could not update order detail');
        res.status(200).json(orderDetailFound);
    } catch (error) {
        res.status(404).json(error.message);   
    }
}

const handlerDeleteOrdersDetails = async ( req, res ) => {
    try {
        const body = req.body;
        const idDetail = body.idDetail;
        const orderDetailResult = await deleteOrderDetail(idDetail);
        if ( orderDetailResult === null) throw Error ('Could not disable order details or order detail not found');
        res.status(200).json(orderDetailResult);    
    } catch (error) {
        res.status(404).json(error.message);    
    }
}

module.exports = {
    handlerGetAllOrdersDetails,
    handlerGetOrderDetailById,
    handlerPostOrderDetail,
    handlerPutOrdersDetails,
    handlerDeleteOrdersDetails,
}