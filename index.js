// index.js

/**
 * Required External Modules
 */

const express = require("express");
const passport = require('passport');
const bodyParser = require('body-parser');
const router = express.Router();

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);

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

app.use('/session', sessionRoutes);
app.use('/users', usersRoutes);


/**
 * Server Activation
 */

  app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });