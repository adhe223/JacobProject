module.exports = function (app) {
  const samples = require('../controllers/samplesController');

  app.route('/samples')
    .get(samples.getAllSamples)
    .post(samples.createSample);

  app.route('/samples/:sampleId')
    .get(samples.getSample)
    .put(samples.updateSample)
    .delete(samples.deleteSample);
};
