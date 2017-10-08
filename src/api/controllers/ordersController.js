const db = require('../../db');
const utils = require('../../utils');

const getAllOrders = (req, res) => {
  db.query('SELECT * FROM orders', (err, result) => {
    if (err) {
      return res.send(err.message);
    }

    return res.json(result);
  });
};

const createOrder = (req, res) => {
  const order = {
    date: utils.generateSqlDateTime(),
    cost: req.body.cost,
    Customer_customerId: req.body.customerId,
  };

  db.query('INSERT INTO orders SET ?', order, (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      console.log('Inserted ' + result.affectedRows + ' row(s)');
    }
    return res.end();
  });
};

const getOrder = (req, res) => {
  const orderId = req.params.orderId;

  db.query('SELECT * FROM orders WHERE orderId = ?', [orderId], (err, result) => {
    if (err) {
      return res.send(err.message);
    } else {
      return res.json(result);
    }
  });
};

const updateOrder = (req, res) => {
  const orderId = req.params.orderId;
  const changedColumns = req.body.changed;
  let errMessages = '';

  Object.keys(changedColumns).forEach(column => {
    const columnValue = changedColumns[column];

    db.query(
      'UPDATE orders SET ?? = ? where orderId = ?',
      [column, columnValue, orderId],
      (err, result) => {
        if (err) {
          errMessages += err.message + ' ';
        } else {
          console.log('Updated column in ' + result.affectedRows + ' row(s)');
        }
      }
    );

    if (errMessages) {
      return res.send(errMessages);
    } else {
      res.end();
    }
  });

  return res.end();
};

const deleteOrder = (req, res) => {
  const orderId = req.params.orderId;

  db.query('DELETE FROM orders WHERE orderId = ?', [orderId], (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      console.log('Deleted ' + result.affectedRows + ' row(s)');
    }
    return res.end();
  });
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
