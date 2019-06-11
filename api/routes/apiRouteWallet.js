'use strict';

module.exports = function(app) {
  var api = require('../controllers/apiWalletController');


  app.route('/CreateWallet')
    .post(api.check_receiver)
    .get(api.list_all_wallets);

  app.route('/CheckBalance')
    .post(api.get_balance_only);

  app.route('/TransactionsByAccount')
    .post(api.list_all_transactions_by_account);

  app.route('/NumberTransactionsByAccount')
    .post(api.number_transactions_by_account);

  app.route('/CreateBTCWallet')
    .post(api.create_wallet_btc);

  app.route('/TransactionsByAccountBTC')
    .post(api.list_transactions_btc);
};
