const db = require('../../db');

const getAllSamples = (req, res) => {
  db.query('SELECT * FROM samples', (err, result) => {
    if (err) {
      return res.send(err.message);
    }

    return res.json(result);
  });
};

const createSample = (req, res) => {
  const sample = {
    data: 'data',
    Order_orderId: req.body.orderId,
  };

  db.query('INSERT INTO samples SET ?', sample, (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      console.log('Inserted ' + result.affectedRows + ' row(s)');
    }
    return res.end();
  });
};

const getSample = (req, res) => {
  const sampleId = req.params.sampleId;

  db.query('SELECT * FROM samples WHERE sampleId = ?', [sampleId], (err, result) => {
    if (err) {
      return res.send(err.message);
    } else {
      return res.json(result);
    }
  });
};

const updateSample = (req, res) => {
  const sampleId = req.params.sampleId;
  const changedColumns = req.body.changed;
  let errMessages = '';

  Object.keys(changedColumns).forEach(column => {
    const columnValue = changedColumns[column];

    db.query(
      'UPDATE samples SET ?? = ? where sampleId = ?',
      [column, columnValue, sampleId],
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

const deleteSample = (req, res) => {
  const sampleId = req.params.sampleId;

  db.query('DELETE FROM samples WHERE sampleId = ?', [sampleId], (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      console.log('Deleted ' + result.affectedRows + ' row(s)');
    }
    return res.end();
  });
};

module.exports = {
  getAllSamples,
  createSample,
  getSample,
  updateSample,
  deleteSample,
};
