'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var api = require('../controllers/apiWalletController');

var WalletSchema = new Schema({
    Index: {
      type: Number,
      
    },
    Number_wallet: {
      type: String,
      required: 'Number of wallets to be created'
    },
    Nombre_Propietario: {
      type : String,
      required : 'Nombre de la persona dueña'
    },
    Public_Address: { 
      type: String,
      //default: addressPublic
      
    },
    Private_Address: {
      type: String,
      //default: addressPrivate
    },
    Created_date: {
      type: Date,
      default: Date.now
    }
  });

// var CounterSchema = Schema({
//     _id: {type: String, required: true},
//     seq: { type: Number, default: 0 }
// });
// var counter = mongoose.model('counter', CounterSchema);

// var entitySchema = mongoose.Schema({
//     testvalue: {type: String}
// });

// entitySchema.pre('save', function(next) {
//     var doc = this;
//     counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
//         if(error)
//             return next(error);
//         doc.testvalue = counter.seq;
//         next();
//     });
// });


  module.exports = mongoose.model('Wallets', WalletSchema);