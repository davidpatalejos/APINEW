'use strict';
var util = require('util');
var stringify = require('stringify');
var util = require('util')
//util.inspect()
//var api = require('../models/apiModelWallet');

var mongoose = require('mongoose'),
  Wallet = mongoose.model('Wallets');

//Make wallet




exports.check_receiver = function(req, res) { 
    var new_wallet = new Wallet(req.body);
    new_wallet.save(function(err, walletCreated) {
        if (err)
            res.send(err);
        else
            var Web3 = require('web3');
            var web3SocketProvider = new Web3.providers.WebsocketProvider('https://ropsten.infura.io/0b0ac1c4525c48d3a26f31b516eabc70');
            var web3Obj = new Web3(web3SocketProvider);
            var walletNew = web3Obj.eth.accounts.create();
            var addressPublic = walletNew['address'];
            var addressPrivate = walletNew['privateKey'];
            Wallet({_Public_Address: addressPublic, _Private_Address: addressPrivate});
            var objAddresess = {"Public_Address" : addressPublic, "Private_Address": addressPrivate};        
            var walletCreated = Object.assign(walletCreated, objAddresess);
            //res.json(util.inspect(walletNew, {showHidden: false, depth: null}));
            res.json({walletCreated});
        
    });
};

exports.list_all_wallets = function(req, res) {
    Wallet.find({}, function(err, walletCreated) {
        if (err){
            res.send(err);
        } 
        else {
            res.json(walletCreated);
        }
    });
};

exports.get_balance_wallets = function(req,res){

};



// var request = require('request');
// request('http://ip-api.com/json', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(response.body);    // Prints the JSON object
//     var object = JSON.parse(body);
//     console.log(object['country']) // Prints the country value from the JSON object
//   }
// });