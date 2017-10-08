module.exports = function(app) {
  const customer = require('../controllers/customerController');

  app.route('/customers')
    .get(customer.getAllCustomers)
    .post(customer.createCustomer);


  app.route('/customers/:customerId')
    .get(customer.getCustomer)
    .put(customer.updateCustomer)
    .delete(customer.deleteCustomer);
};