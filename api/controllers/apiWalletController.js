const Web3 = require('web3');
const web3SocketProvider = new Web3.providers.WebsocketProvider('https://ropsten.infura.io/0b0ac1c4525c48d3a26f31b516eabc70');
const web3Obj = new Web3(web3SocketProvider);
'use strict';

var mongoose = require('mongoose'),
  Wallet = mongoose.model('Wallets');

//Make wallet
exports.check_receiver = function(req, res) {
    var new_wallet = new Task(req.body);
    new_task.save(function(err, balance) {
        //const web3 = new Web3('ropsten.infura.io/0b0ac1c4525c48d3a26f31b516eabc70');
        balance = web3Obj.eth.getBalance('0xee1769674Ce5f94D43C200138ca4dF9546445DB1').then(console.log);
        if (err)
            res.send(err);
        res.json(balance);
    });
};

exports.list_all_wallets = function(req, res) {
    Wallet.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

