var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
//Task = require('./api/models/apiModel'),
Wallet = require('./api/models/apiModelWallet'),
bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/api');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/apiRouteWallet');
routes(app);

app.use(function(req, res) {
res.status(404).send({url: req.originalUrl + ' not found'})
});


app.listen(port);


///////
var util = require('util');
var stringify = require('stringify');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/0b0ac1c4525c48d3a26f31b516eabc70'));
balance = web3.eth.accounts.wallet.create(1, '54674321§3456764321§345674321§3453647544±±±§±±±!!!43534534534534');

balanceView = util.inspect(balance, false, null);
//balanceView = JSON.stringify(balance);

console.log('RESTful API server started on: ' + port + ' ' + balanceView);



// ----------------------------------------------------------------
