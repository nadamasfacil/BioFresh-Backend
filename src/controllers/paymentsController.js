const {Payments, Orders, Users} = require("../db.js");

const getAllPayments = async () => {
    return await Payments.findAll();
}

const addPaymentUser = async (payment_id, status, payment_type, orderId , email) => {
    const userFindOrder = await Users.findOne({
        where: {
          email
        },
        include: [
          {
            model: Orders,
            where: {
              id: orderId
            }
          }
        ]
      });
      
      if (userFindOrder) {
        const payment = await Payments.create({ id: payment_id, name: payment_type, status: status, userEmail: email });
        await payment.addOrder(userFindOrder);
        return payment;
      }      
}

module.exports = { addPaymentUser , getAllPayments };