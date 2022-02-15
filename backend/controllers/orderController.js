const Order = require("../model/orderModel");
const Product = require("../model/productModel");
const ErrorHandler = require("../utils/errorhandler");

const newOrder = async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({ success: true, order });
};

const getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(
      new ErrorHandler(`No Order Found With id:${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, order });
};

const myOrders = async (req, res, next) => {
  const orders = await Order.find({
    user: req.user._id,
  });
  res.status(200).json({ success: true, orders });
};

const getAllOrders = async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
    total: orders.length,
  });
};
//-----------------------------------
async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}
//---------------------------------------
const updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorHandler(`No Order Found With id:${req.params.id}`, 404)
    );
  }
  if (order.orderStatus === "Delivered") {
    return next(
      new ErrorHandler("You have Already delivered this product", 404)
    );
  }
  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });
  }
  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
};

const deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorHandler(`No Order Found With id:${req.params.id}`, 404)
    );
  }
  await order.remove();
  res.status(200).json({
    success: true,
  });
};

module.exports = {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
