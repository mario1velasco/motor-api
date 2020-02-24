module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.get('host'));
    console.log(req.protocol);
    console.log(req.originalUrl);

    console.log(`User authenticated middleware`);
    next();
  } else {
    // res.redirect('/login?fromUrl='+req.originalUrl);
    // res.redirect('/login?fromUrl='+req.originalUrl);
    // res.redirect('/login?fromUrl='+req.originalUrl);
    // res.redirect('/login?fromUrl='+req.originalUrl);
    console.log(`User NO authenticated middleware`);
    res.status(401).json({
      message: 'User is not authenticate'
    });
  }
};