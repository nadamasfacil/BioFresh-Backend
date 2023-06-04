const { Op } = require('sequelize');
const { Orders, OrdersDetails, Products } = require('../db');

const getAllOrdersDetails = async (orderId) => {
  if (!orderId) return await OrdersDetails.findAll();
  return await OrdersDetails.findAll({
    where : {
      orderId: orderId
    }
  })
};



const getOrderDetailsById = async (orderDetailId) => {
  return await OrdersDetails.findByPk(orderDetailId);
};



const postOrderDetail = async (orderDetail) => {

  const { idOrder, idProduct, units } = orderDetail;
  const product = await Products.findByPk(idProduct);
  if (product === null) throw Error('Product not found');

  console.log('product en post ', product.averageRating);
  let unitsProduct = product.averageRating;

  let order = await Orders.findByPk(idOrder);
  if (order === null) throw Error('Order not found');
  
  // localizar el detalle de la orden
  let getOrDet = await order.getOrdersDetails();
  
  // Revisar si existe el detalle con el producto agregado
  let orderDetailFound = null;
  for (let i=0; i < getOrDet.length; i++) {
    // busco el Detail de la orden
    const productOrderDetail = await OrdersDetails.findByPk(getOrDet[i].id);
    // comparo el producto del Detail con el producta a agregar
    if (productOrderDetail.productId === idProduct) {
      // como lo encontre lo asigno como id de busqueda
      orderDetailFound = getOrDet[i];
      i = getOrDet.lenght;
    };
  };

  // Crear o actualizar el detalle de la orden según el caso
  let orderDetailAdd;
  if (orderDetailFound === null) {
    const detailOrder = {
      units: units,
      amount: units * product.price,
      taxAmount: (units * product.price) * product.tax,
      totalAmount: ((units * product.price) * product.tax) + (units * product.price),
      status: 'Cart'
    };
    orderDetailAdd = await OrdersDetails.create(detailOrder);
    await order.addOrdersDetails(orderDetailAdd.id);
    await product.addOrdersDetails(orderDetailAdd.id);
  } else {
    orderDetailAdd = await OrdersDetails.findByPk(orderDetailFound.id);
    const unitsAdd = orderDetailAdd.units + units;
    orderDetailAdd.units = unitsAdd;
    orderDetailAdd.amount = unitsAdd * product.price;
    orderDetailAdd.taxAmount = (unitsAdd * product.price) * product.tax;
    orderDetailAdd.totalAmount = ((unitsAdd * product.price) * product.tax) + (unitsAdd * product.price);
    
    await orderDetailAdd.save();
    
  };
  
  await totalsOrder(idOrder);
  
  product.averageRating = unitsProduct + units;
  await product.save();
  console.log('product en post actualizado ', product.averageRating);
  
  return orderDetailAdd;
};



const putOrderDetail = async (orderDetail) => {
  const { idDetail, units } = orderDetail;

  // busqueda de registros en orders, products y ordersDetails
  const orderDetailResult = await OrdersDetails.findByPk(idDetail);
  if (orderDetailResult === null) throw Error('Order Detail not found');
  const orderId = orderDetailResult.orderId;
  const order = await Orders.findByPk(orderId);
  if (order === null) throw Error('Order not found');
  const productId = orderDetailResult.productId;
  const product = await Products.findByPk(productId);
  if (product === null) throw Error('Product not found');

  console.log('product en put ', product.averageRating);
  let unitsProduct = product.averageRating;
  
  
  // asignar nuevos valores
  orderDetailResult.units = units;
  orderDetailResult.amount = units * product.price;
  orderDetailResult.taxAmount = (units * product.price) * product.tax;
  orderDetailResult.totalAmount = ((units * product.price) * product.tax) + (units * product.price);
  await orderDetailResult.save();
  
  await totalsOrder(orderId);


  product.averageRating = units + unitsProduct;
  await product.save();
  console.log('product  actualizado en put ', product.averageRating);
  
  return orderDetailResult;
};



const deleteOrderDetail = async (idDetail) => {

  // busqueda de registros en orders, products y ordersDetails
  const orderDetailResult = await OrdersDetails.findByPk(idDetail);
  if (orderDetailResult === null) throw Error('Order Detail not found');
  const resultOrderDetail = orderDetailResult;
  const orderId = resultOrderDetail.orderId;
  const order = await Orders.findByPk(orderId);
  if (order === null) throw Error('Order not found');
  const productId = orderDetailResult.productId;
  const product = await Products.findByPk(productId);
  if (product === null) throw Error('Product not found');

  console.log('product en delete ', product.averageRating);
  const unitsProduct = product.averageRating - resultOrderDetail.units;
  
  // remover relaciones
  await order.removeOrdersDetails(orderDetailResult.id);
  await product.removeOrdersDetails(orderDetailResult.id);
  
  // borrar detail
  await orderDetailResult.destroy();
  
  await totalsOrder(orderId);
  
  product.averageRating = unitsProduct;
  await product.save();
  console.log('product actualizado en delete ', product.averageRating);
  
  return resultOrderDetail;
};  

const totalsOrder = async (orderId) => {
  const order = await Orders.findByPk(orderId);
  getOrDet = await order.getOrdersDetails();
  let tAmount = 0;
  let tTaxAmount = 0;
  let tTotalAmount = 0;
  for (let i=0; i < getOrDet.length; i++) {
    const orderDetail = await OrdersDetails.findByPk(getOrDet[i].id);
    tAmount += orderDetail.amount;
    tTaxAmount += orderDetail.taxAmount;
    tTotalAmount += orderDetail.totalAmount;
  };
  order.amount = tAmount;
  order.taxAmount = tTaxAmount;
  order.totalAmount = tTotalAmount;
  await order.save();  
};

module.exports = {
  getAllOrdersDetails,
  getOrderDetailsById,
  postOrderDetail,
  putOrderDetail,
  deleteOrderDetail,
}