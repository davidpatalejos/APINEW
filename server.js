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


var routes = require('./api/routes/apiRoute');
routes(app);

app.use(function(req, res) {
res.status(404).send({url: req.originalUrl + ' not found'})
});


app.listen(port);

console.log('RESTful API server started on: ' + port);