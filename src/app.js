const express = require('express');
const app = express();
const customerRoutes = require('./api/routes/customerRoutes');
const ordersRoutes = require('./api/routes/ordersRoutes');
const samplesRoutes = require('./api/routes/samplesRoutes');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

customerRoutes(app);
ordersRoutes(app);
samplesRoutes(app);

app.listen(port);

console.log('RESTful API server started on: ' + port);

// More graceful fallback
app.use((req, res) => {
  res.status(404).send({url: req.originalUrl + ' not found'});
});
