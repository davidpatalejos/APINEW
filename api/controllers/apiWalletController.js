'use strict';
var util = require('util');
var stringify = require('stringify');
var util = require('util')
var https = require('https')
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $  = require('jquery')(window);
//util.inspect()
//const Wallet = require('../models/apiModelWallet');


var mongoose = require('mongoose'),
  Wallet = mongoose.model('Wallets');

//Make wallet

exports.check_receiver = function(req, res) { 
    var new_wallet = new Wallet(req.body);
    var Web3 = require('web3');
    var web3SocketProvider = new Web3.providers.WebsocketProvider('https://ropsten.infura.io/0b0ac1c4525c48d3a26f31b516eabc70');
    var web3Obj = new Web3(web3SocketProvider);
    var walletNew = web3Obj.eth.accounts.create();
    var addressPublic = walletNew['address'];
    var addressPrivate = walletNew['privateKey'];
    new_wallet.Public_Address = addressPublic;
    new_wallet.Private_Address = addressPrivate;
    //var objAddresess = {"Public_Address" : addressPublic, "Private_Address": addressPrivate};       
    new_wallet.save(function(err, walletCreated) {
        if (err)
            res.send(err);
        else
            //var walletCreated = Object.assign(walletCreated, objAddresess);
            //res.json(util.inspect(walletNew, {showHidden: false, depth: null}));
            res.json({walletCreated});
        
    });
};

exports.get_balance_only = function(req, res) {
    const Public_Address = req.body['Public_Address'];
    /*var new_balance = new Wallet(req.body);
    var Web3 = require('web3');
    var web3SocketProvider = new Web3.providers.WebsocketProvider('https://ropsten.infura.io/0b0ac1c4525c48d3a26f31b516eabc70');
    var web3Obj = new Web3(web3SocketProvider);
    //var balances = 
    web3Obj.eth.getBalance(Public_Address ,function(err,balance) {
        if(err) {
            res.send(err)
        } else {
            res.json(balance.toString())
        }
    });
    //res.json("");

    
    //res.json("asdasd")
    //res.json(balance);
    //new_balance.Balance = balances;
    //res.json(Public_Address);
  /*  new_balance.save(function(err, balance){
          if(err)
              res.send(err);
          else
              res.json(balance);
    });*/


    var settings = {
        "url": "https://ropsten.infura.io",
        "method": "POST",
        "timeout": 0,
        "data": JSON.stringify({jsonrpc:"2.0",id:1,method:"eth_getBalance", params :[Public_Address, 'latest']}),
      };
      
      $.ajax(settings).done(function (response) {
        res.json(response);
      });


};



exports.list_all_wallets = function(req, res) {
    Wallet.find({}, function(err, walletsCreated) {
        if (err){
            res.send(err);
        } 
        else {
            res.json(walletsCreated);
        }
    });
};

exports.get_balance_wallets = function(req,res){

    function GetBalanceWallets(err, balance){
        var arrayAddress = [];
        var arrayBalances = [];
        var stringaddress = Wallet.find({addressPublic});
        for (var i in stringaddress) {
            arrayAddress[i];
            var Web3 = require('web3');
            var web3SocketProvider = new Web3.providers.WebsocketProvider('https://ropsten.infura.io/0b0ac1c4525c48d3a26f31b516eabc70');
            var web3Obj = new Web3(web3SocketProvider);
            var balance = web3Obj.eth.getBalance(arrayAddress[i]);
            arrayBalances[balance]; 
            
        }
        
    };

};

exports.read_wallets_balance = function(req, res) {
    var arrayAddress = [];
    var arrayBalances = [];
    var stringaddress = Wallet.find({addressPublic});
    for (var i in stringaddress) {
        arrayAddress[i];
        var Web3 = require('web3');
        var web3SocketProvider = new Web3.providers.WebsocketProvider('https://ropsten.infura.io/0b0ac1c4525c48d3a26f31b516eabc70');
        var web3Obj = new Web3(web3SocketProvider);
        var balance = web3Obj.eth.getBalance(arrayAddress[i]);
        arrayBalances[balance]; 
    }
    Wallet.findById(req.params.walletId, function(err, balance) {
      if (err)
        res.send(err);
      res.json(task);
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