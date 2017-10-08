module.exports = function (app) {
  const orders = require('../controllers/ordersController');

  app.route('/orders')
    .get(orders.getAllOrders)
    .post(orders.createOrder);

  app.route('/orders/:orderId')
    .get(orders.getOrder)
    .put(orders.updateOrder)
    .delete(orders.deleteOrder);
};
