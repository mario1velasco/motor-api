module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(`User authenticated middleware`);
    next();
  } else {
    console.log(`User NO authenticated middleware`);
    res.status(400).json({
      message: 'User is not authenticate'
    });
  }
};