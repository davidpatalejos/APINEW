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
var bcypher = require('blockcypher');
var $  = require('jquery')(window);

//const Etherscan = require('node-etherscan-api')
//var Etherscan = require('etherscan-api').init('EKXF1IYHC6UVAEMRVCWC6FKITX9WWEQ77R','ropsten', '3000');


//util.inspect()
//const Wallet = require('../models/apiModelWallet');


var mongoose = require('mongoose'),
  Wallet = mongoose.model('Wallets');

//Make wallet

exports.check_receiver = function(req, res) { 
    var new_wallet = new Wallet(req.body);
    var Web3 = require('web3');
    //var web3SocketProvider = new Web3.providers.WebsocketProvider('https://ropsten.infura.io/0b0ac1c4525c48d3a26f31b516eabc70'); //Ropsten 
    var web3SocketProvider = new Web3.providers.WebsocketProvider('https://mainnet.infura.ios/7cfaa055cba64da0b8c8d1af7d442507'); //Mainnet
    var web3Obj = new Web3(web3SocketProvider);
    var walletNew = web3Obj.eth.accounts.create();
    var addressPublic = walletNew['address'];
    var addressPrivate = walletNew['privateKey'];
    new_wallet.Public_Address = addressPublic;
    new_wallet.Private_Address = addressPrivate;
    var objAddresess = {"Public_Address" : addressPublic, "Private_Address": addressPrivate};       
    //new_wallet.save(function(err, walletCreated) {
    var walletCreated = Object.assign(new_wallet, objAddresess);
            //res.json(util.inspect(walletNew, {showHidden: false, depth: null}));
    res.json({walletCreated});
};

exports.get_balance_only = function(req, res) {
    const Public_Address = req.body['Public_Address'];
    var settings = {
        //"url": "https://ropsten.infura.io", //Ropsten 
        "url": "https://mainnet.infura.io", //Mainnet
        "method": "POST",
        "timeout": 0,
        "data": JSON.stringify({jsonrpc:"2.0",id:1,method:"eth_getBalance", params :[Public_Address, 'latest']}),
      };  
      $.ajax(settings).done(function (response) {
        response.result = parseInt(response.result);
        res.json(response.result);
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

exports.number_transactions_by_account = function(req, res) {
    const Public_Address = req.body['Public_Address'];
    var settings = {
        //"url": "https://ropsten.infura.io", //Ropsten 
        "url": "https://mainnet.infura.io", //Mainnet
        "method": "POST",
        "timeout": 0,
        "data": JSON.stringify({jsonrpc:"2.0",id:1,method:"eth_getTransactionCount", params :[Public_Address, 'latest']}),
      };  
      $.ajax(settings).done(function (response) {
        response.result = parseInt(response.result);
        res.json(response.result);
        });
};




exports.list_all_transactions_by_account = function(req, res) {
    const Public_Address = req.body['Public_Address'];

    // // Replace the value below with the your Etherscan token

    // // Creating the Etherscan instance
     //const etherscan = new Etherscan('EKXF1IYHC6UVAEMRVCWC6FKITX9WWEQ77R', 'ropsten');

    // // Creating a request for account balance in Ether (default returns in Wei)
    //var list = etherscan.getTransactions(Public_Address, 1, 'latest', 1, 100, 'asc');
    //var Etherscan = require('etherscan-api').init('YGTAWVMQFAJJ83IY652T3QQ2MBCWS5KZ8E','ropsten', '3000'); //Ropsten
    var Etherscan = require('etherscan-api').init('YGTAWVMQFAJJ83IY652T3QQ2MBCWS5KZ8E'); //Mainnet
    var txlist = Etherscan.account.txlist(Public_Address, 1, 'latest', 1, 100, 'desc');
    txlist.then(function(balanceData){
        res.json(balanceData.result);
    }, function(e) {
        res.json((e == "NOTOK") ? "No hay transacciones todavía" : e);
    });
    
  //  res.json(txlist);
};


exports.create_wallet_btc = function(req, res) {
    var bcapi = new bcypher('btc','main','6b31935f4c7049f49f2acbbe2b21432f');

    function printResponse(err, data) {
    if (err !== null) {
        console.log(err);
    } else {
        console.log(data);
    }
    }

    //$.post('https://api.blockcypher.com/v1/btc/test3/addrs')//Ropsten
    $.post('https://api.blockcypher.com/v1/btc/main/addrs')//Mainnet
    .then(function(d) {
        var new_wallet = new Wallet(req.body);
        var objAddresess = {"Public_Address" : d.public , "Private_Address": d.private, "Address" : d.address, "wif" : d.wif};      
        var walletCreated = Object.assign(new_wallet, objAddresess);
        res.json(walletCreated)
    });
};


exports.list_transactions_btc = function(req, res) {
    var bcapi = new bcypher('btc','main','6b31935f4c7049f49f2acbbe2b21432f');
    const Public_Address = req.body['Address'];

    function printResponse(err, data) {
    if (err !== null) {
        console.log(err);
    } else {
        console.log(data);
    }
    }


    //$.get('https://api.blockcypher.com/v1/btc/test3/addrs/' + Public_Address + '/full?after=1')//Ropsten
    $.get('https://api.blockcypher.com/v1/btc/main/addrs/' + Public_Address+ '/full?after=1')//Mainnet
    .then(function(d) {
        res.json(d)
    });
};



//etherscanApi.getTransactions(address, [options])



// var request = require('request');
// request('http://ip-api.com/json', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(response.body);    // Prints the JSON object
//     var object = JSON.parse(body);
//     console.log(object['country']) // Prints the country value from the JSON object
//   }
// });