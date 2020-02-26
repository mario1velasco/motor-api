module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("is Authenticated");
    next();
  } else {
    console.log("is NOT Authenticated");
    res.status(401).json({
      message: 'User is not authenticate'
    });
  }
};