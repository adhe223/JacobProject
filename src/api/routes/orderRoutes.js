module.exports = function (app) {
  const order = require('../controllers/orderController');

  app.route('/order')
    .get(order.getAllOrders)
    .post(order.createOrder);

  app.route('/orders/:orderId')
    .get(order.getOrder)
    .put(order.updateOrder)
    .delete(order.deleteOrder);
};
