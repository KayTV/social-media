var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var knex = require('../../../db/knex');
var helpers = require('./helpers');


passport.use(new LocalStrategy({
  usernameField: 'email'
}, function(email, password, done) {
    // does the email exist?
    knex('users').where('email', email)
    .then(function(data) {
      // email does not exist. return error.
      if (!data.length) {
        return done('Incorrect email.');
      }
      var user = data[0];
      // email found but do the passwords match?
      if (helpers.comparePassword(password, user.password)) {
        // passwords match! return user
        return done(null, user);
      } else {
        // passwords don't match! return error
        return done('Incorrect password.');
      }
    })
    .catch(function(err) {
      // issue with SQL/nex query
      return done('Incorrect email and/or password.');
    });
  }
));

// sets the user to 'req.user' and establishes a session via a cookie
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used on subsequent requests to update 'req.user' and updates session
passport.deserializeUser(function(id, done) {
  knex('users').where('id', id)
  .then(function(data) {
    return done(null, data[0]);
  })
  .catch(function(err) {
    return done(err);
  });
});


module.exports = passport;
