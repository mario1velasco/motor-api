module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(`User authenticated`);
    next();
  } else {
    res.status(400).json({
      message: 'User is not authenticate'
    });
  }
};