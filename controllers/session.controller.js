const passport = require('passport');
const ApiError = require('../models/api-error.model');

module.exports.create = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("AAAAAA");
  console.log('Params = ' + JSON.stringify(req.params));
  console.log('Body = ' + JSON.stringify(req.body));
  // console.log('RES =' + res.toString());
  
  
  if (!email || !password) {
    next(new ApiError('Email, password are required', 400));
  } else {
    passport.authenticate('local-auth', (err, user, message) => {
      if (err) {
        next(err);
      } else if (!user) {
        next(new ApiError(message, 401));
      } else {
        req.login(user, (err) => {
          if (err) {
            next(err);
          } else {
            console.log("AAAAAAAAAAAAA");
            console.log("AAAAAAAAAAAAA");
            console.log("AAAAAAAAAAAAA");
            
            res.json(user);
          }
        });
      }
    })(req, res, next);
  }
};

module.exports.destroy = (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Success' });
};