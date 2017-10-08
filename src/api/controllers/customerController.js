const db = require('../../db');

const getAllCustomers = (req, res) => {
  db.query('SELECT * FROM customer', (err, result, fields) => {
    if (err) {
      res.send(err.message);
    }

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

  db.query('INSERT INTO customer SET ?', customer, (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      console.log('Inserted ' + result.affectedRows + ' row(s)');
    }
    res.end();
  });
};

const getCustomer = (req, res) => {
  const customerId = req.params.customerId;

  db.query('SELECT * FROM customer WHERE customerId = ?', [customerId], (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.json(result);
    }
  });
};

const updateCustomer = (req, res) => {
  const customerId = req.params.customerId;
  const changedColumns = req.body.changed;

  Object.keys(changedColumns).forEach(column => {
    const columnValue = changedColumns[column];

    db.query(
      'UPDATE customer SET ?? = ? where customerId = ?',
      [column, columnValue, customerId],
      (err, result) => {
        if (err) {
          res.send(err.message);
        } else {
          console.log('Updated column in ' + result.affectedRows + ' row(s)');
        }
      },
    );
  });

  res.end();
};

const deleteCustomer = (req, res) => {
  const customerId = req.params.customerId;

  db.query('DELETE FROM customer WHERE customerId = ?', [customerId], (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      console.log('Deleted ' + result.affectedRows + ' row(s)');
    }
    res.end();
  });
};

module.exports = {
  getAllCustomers,
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
