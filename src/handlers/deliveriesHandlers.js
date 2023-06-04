const {getAllDeliveriesControllers, getAllDeliveriesHelpers} = require('../controllers/deliveriesControllers.js')


const getDeliveriesHandlers = async (req, res) => {
    try {
        const allDeliveries = await getAllDeliveriesControllers();
        res.status(200).json(allDeliveries);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    getDeliveriesHandlers,
}