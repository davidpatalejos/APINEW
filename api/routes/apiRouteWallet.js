'use strict';
module.exports = function(app) {
  var api = require('../controllers/apiController');


  app.route('/createWallet')
    .post(api.check_receiver)
    .get(api.create_wallet)

};
