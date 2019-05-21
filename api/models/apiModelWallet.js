'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var WalletSchema = new Schema({
    Number_wallet: {
      type: String,
      required: 'Numero de wallets'
    },
    Created_date: {
      type: Date,
      default: Date.now
    },
    Info_wallet: {
      type: String,
      
    }
  });

  module.exports = mongoose.model('Wallets', WalletSchema);