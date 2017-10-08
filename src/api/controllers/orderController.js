const db = require('../../db');

const getAllOrders = (req, res) => {
  db.query('SELECT * FROM order', (err, result) => {
    if (err) {
      res.send(err.message);
    }

    res.json(result);
  });
};

const createOrder = (req, res) => {
  const order = {
    date: req.body.date,
    cost: req.body.cost,
    customerId: req.body.customerId,
  };

  db.query('INSERT INTO order SET ?', order, (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      console.log('Inserted ' + result.affectedRows + ' row(s)');
    }
    res.end();
  });
};

const getOrder = (req, res) => {
  const orderId = req.params.orderId;

  db.query('SELECT * FROM order WHERE orderId = ?', [orderId], (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.json(result);
    }
  });
};

const updateOrder = (req, res) => {
  const orderId = req.params.orderId;
  const changedColumns = req.body.changed;

  Object.keys(changedColumns).forEach(column => {
    const columnValue = changedColumns[column];

    db.query(
      'UPDATE order SET ?? = ? where orderId = ?',
      [column, columnValue, orderId],
      (err, result) => {
        if (err) {
          res.send(err.message);
        } else {
          console.log('Updated column in ' + result.affectedRows + ' row(s)');
        }
      }
    );
  });

  res.end();
};

const deleteOrder = (req, res) => {
  const orderId = req.params.orderId;

  db.query('DELETE FROM order WHERE orderId = ?', [orderId], (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      console.log('Deleted ' + result.affectedRows + ' row(s)');
    }
    res.end();
  });
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
