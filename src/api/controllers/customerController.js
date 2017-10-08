const db = require('../../db');

const getAllCustomers = (req, res) => {
  db.query('SELECT * FROM customer', (err, results, fields) => {
    if (err) {
      res.send(err);
    };

    res.json(results);
  });
};

const createCustomer = (req, res) => {

};

const getCustomer = (req, res) => {

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