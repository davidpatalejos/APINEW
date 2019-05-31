'use strict';

var Web3 = require('web3');
var web3SocketProvider = new Web3.providers.WebsocketProvider('https://ropsten.infura.io/0b0ac1c4525c48d3a26f31b516eabc70');
var web3Obj = new Web3(web3SocketProvider);

var mongoose = require('mongoose'),
  Wallet = mongoose.model('Wallets');

//Make wallet
exports.check_receiver = function(req, res) {
    var new_wallet = new Wallet(req.body);
    new_wallet.save(function(err, balance) {
        //const web3 = new Web3('ropsten.infura.io/0b0ac1c4525c48d3a26f31b516eabc70');
        if (err)
            res.send(err);
        var balance = web3Obj.eth.getBalance('0xee1769674Ce5f94D43C200138ca4dF9546445DB1');    
        res.json({ balance });
    });
};

exports.list_all_wallets = function(req, res) {
    Wallet.find({}, function(err, balance) {
        if (err)
            res.send(err);
        res.json(balance);
    });
};



// var request = require('request');
// request('http://ip-api.com/json', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(response.body);    // Prints the JSON object
//     var object = JSON.parse(body);
//     console.log(object['country']) // Prints the country value from the JSON object
//   }
// });