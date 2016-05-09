var bcrypt = require('bcrypt');

function ensureAuthenticated(req, res, next) {
  if(req.user) {
    return next();
  } else {
    return res.redirect('/login');
  }
}

function loginRedirect(req, res, next) {
  if(req.user) {
    return res.redirect('/');
  } else {
    return next();
  }
}

function hashing(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}


module.exports = {
  ensureAuthenticated: ensureAuthenticated,
  loginRedirect: loginRedirect,
  hashing: hashing,
  comparePassword: comparePassword
};
