const db = require('../../db');

const getAllCustomers = (req, res) => {
  db.query('SELECT * FROM customer', (err, result, fields) => {
    if (err) {
      res.send(err);
    };

    res.json(result);
  });
};

const createCustomer = (req, res) => {
  const customer = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    companyName: req.body.companyName,
    streetAddress: req.body.streetAddress,
    streetAddress2: req.body.streetAddress2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phoneNumber: req.body.phoneNumber,
  };

  dq.query('INSERT INTO customer SET ?', customer, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('successfully inserted customer');
    }
  });
};

const getCustomer = (req, res) => {
  const customerId = req.body.customerId;
  db.query('SELECT * FROM customer WHERE id = ?', [customerId], (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.json(result);
    }
  });
};

const updateCustomer = (req, res) => {

};

const deleteCustomer = (req, res) => {

};

module.exports = {
  getAllCustomers,
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer
}