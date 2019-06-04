'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var Web3 = require('web3');
// var web3SocketProvider = new Web3.providers.WebsocketProvider('https://ropsten.infura.io/0b0ac1c4525c48d3a26f31b516eabc70');
// var web3Obj = new Web3(web3SocketProvider);
// var balance = web3Obj.eth.getBalance('0xee1769674Ce5f94D43C200138ca4dF9546445DB1');

var WalletSchema = new Schema({
    Number_wallet: {
      type: String
    },
    Created_date: {
      type: Date,
      default: Date.now
    }
  });

  module.exports = mongoose.model('Wallets', WalletSchema);