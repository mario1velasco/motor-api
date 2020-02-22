// index.js

/**
 * Required External Modules
 */

const express = require("express");
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

/**
 * App Variables
 */
require("dotenv").config();
const app = express();
const port = process.env.PORT || "4040";
const corsConfig = require('./config/cors.config');

/**
 *  App Configuration
 */
app.use(cors(corsConfig))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'mysuperpassword',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 2419200000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

/**
 *  Ddbb Configuration
 */

require('./config/db.config');
require('./config/passport.config').setup(passport);

/**
 * Routes Definitions
 */

// const usersRoutes = require('./routes/user.routes');
const sessionRoutes = require('./routes/session.routes');
const usersRoutes = require('./routes/user.routes');
const advertsRoutes = require('./routes/advert.routes');

app.use('/session', sessionRoutes);
app.use('/users', usersRoutes);
app.use('/adverts', advertsRoutes);


/**
 * Server Activation
 */

  app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });