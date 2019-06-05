'use strict';

module.exports = function(app) {
  var api = require('../controllers/apiWalletController');


  app.route('/createWallet')
    .post(api.check_receiver)
    .get(api.list_all_wallets);

  app.route('/checkBalance')
    .get(api.get_balance_wallets);
};
