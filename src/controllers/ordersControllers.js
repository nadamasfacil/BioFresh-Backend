const { Orders, OrdersDetails, Users, Products } = require("../db");

const getAllOrders = async () => {
    return await Orders.findAll();
};

const getOrderById = async (id) => {
    return await Orders.findByPk(id);
};

const putShippingOrder = async(orderId, shipping) => {
    const orderFound = await Orders.findByPk(orderId);
    orderFound.shipping = shipping
    await orderFound.save()
    return orderFound;
}

const postOrder = async (userId) => {
    const userFound = await Users.findByPk(userId);
    if (userFound === null) throw Error('User not found');
    const orderResult = await Orders.create({
        orderStatus: 'Cart',
    });
    if (orderResult === null) return null;
    await userFound.addOrder(orderResult.id);
    return orderResult;
}

const deleteOrder = async (idOrder, status) => {
    const orderDelete = await Orders.findByPk(idOrder);
    if (orderDelete === null) return null;
    orderDelete.orderStatus = status;
    await orderDelete.save();
    const ordersDetailsFound = await Orders.getOrdersDetials();
    for (let i=0; i< ordersDetailsFound; i++) {
        const orderD = await OrdersDetails.findByPk(ordersDetailsFound.id);
        orderD.orderStatus = status;
        await orderD.save();
    }
    return orderDelete;
};

const clearOrder = async (orderId) => {
    const orderClear = await Orders.findByPk(orderId);
    if (orderClear === null) return null;
    const ordersDetailsFound = await OrdersDetails.findAll({
        where : {
            orderId: orderId
        }
    });
    for (let i=0; i< ordersDetailsFound.length; i++) {
        const orderD = await OrdersDetails.findByPk(ordersDetailsFound[i].id);
        const productId = orderD.productId;
        const product = await Products.findByPk(productId);
        if (product === null) throw Error('Product not found');

        console.log('product en delete ', product.averageRating);
        const unitsProduct = product.averageRating - ordersDetailsFound[i].units;

        await orderClear.removeOrdersDetails(orderD.id);
        await product.removeOrdersDetails(orderD.id);
        await orderD.destroy();

        product.averageRating = unitsProduct;
        await product.save();
        console.log('product actualizado en delete ', product.averageRating);
    };
    orderClear.amount = 0;
    orderClear.taxAmount = 0;
    orderClear.totalAmount = 0;
    await orderClear.save();
    return orderClear;
};

module.exports = {
    getAllOrders,
    getOrderById,
    postOrder,
    deleteOrder,
    clearOrder,
    putShippingOrder
};