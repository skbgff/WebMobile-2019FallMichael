var passport = require('passport');
var Local = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new Local({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Password not found in db
      if (!user) {
        return done(null, false, {
          message: 'No user found'
        });
      }
      // wrong password
      if (!user.checkPassword(password)) {
        return done(null, false, {
          message: 'Incorrect'
        });
      }
      // Successful login
      return done(null, user);
    });
  }
));
