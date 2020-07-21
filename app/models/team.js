/**
 * Car
 *
 * @module      :: Model
 * @description :: Represent data model for the Cars
 * @author      :: Aditya Salman
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Team = new Schema({

  nama: {
    type: String,
    require: true
  },
  nim: {
    type: String,
    require: true,
    unique: true
  },
  divisi: {
    type: String,
    require: true
  },
  lokasi: {
    type: String,
    require: true
  },
  modified: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Team', Team);