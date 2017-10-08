const express = require('express');
const app = express();
const routes = require('./api/routes/customerRoutes');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);
app.listen(port);

console.log('RESTful API server started on: ' + port);

// More graceful fallback
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});