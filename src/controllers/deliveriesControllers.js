const {Deliveries} = require('../db');
const {deliveriesArray} = require('../helpers/deliveriesArray.js');

const getAllDeliveriesHelpers = async () => {
    for (let i = 0; i < deliveriesArray.length; i++) {
        await Deliveries.create(deliveriesArray[i]);
    };
    const delivArray = await Deliveries.findAll();
}

const getAllDeliveriesControllers = async () => {
    return await Deliveries.findAll();
}





module.exports = {
    getAllDeliveriesControllers,
    getAllDeliveriesHelpers
}