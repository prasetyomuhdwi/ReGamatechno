/**
 * About
 *
 * @module      :: Model
 * @description :: Represent data model for the Cars
 * @author      :: Aditya Salman
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var About = new Schema({

  deskripsi:    {
    type    : String,
    require : true
  },  
  modified: {
    type    : Date,
    default : Date.now
  }
});

/*
Produk.path('model').validate(function (v) {
  return ((v != "") && (v != null));
});
*/

module.exports = mongoose.model('About', About);