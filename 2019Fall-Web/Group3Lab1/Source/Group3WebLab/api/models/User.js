var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var Class = require('../models/Class.js');



var userSchema = new mongoose.Schema({
  email: { type: String,  unique: true, required: true },
  name: String,
  phone_number: String,
  address: String,
  notes: String,
  hash: String,
  salt: String,
  classes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]
});



userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync( password,
                                 this.salt,
                                 1000,
                                 64, 'sha512').toString('hex');
};

userSchema.methods.checkPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.newJwt = function() {
  var expire = new Date();
  expire.setDate(expire.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expire.getTime() / 1000),
  }, "TEST"); // Do not do this, should be on hard config file on server
};

module.exports = mongoose.model('User', userSchema);
