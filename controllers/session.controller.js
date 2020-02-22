const passport = require('passport');

module.exports.authenticate = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(400).json({
      message: 'Email, password are required'
    });
  } else {
    passport.authenticate('local-auth', (err, user, message) => {
      if (err) {
        next(err);
      } else if (!user) {
        console.log(`MESAGGE = ${message}`);
        res.status(401).json({
          message: message
        });
      } else {
        req.login(user, (err) => {
          if (err) {
            next(err);
          } else {
            console.log(`Auth Ok for user ${user.email}`);
            res.json(user);
          }
        });
      }
    })(req, res, next);
  }
};

module.exports.destroy = (req, res, next) => {
  console.log('Session destroy');
  req.logout();
  res.status(200).json({ message: 'Success' });
};