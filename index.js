// index.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
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

// require('./config/db.config');
// require('./config/passport.config').setup(passport);

/**
 * Routes Definitions
 */

// const usersRoutes = require('./routes/user.routes');
const sessionRoutes = require('./routes/session.routes');

app.use('/session', sessionRoutes);


  // router.get("/", (req, res) => {
  //   res.status(200).send({WHATABYTE: 'Food For Devs'});
  // });

  // router.get("/api", (req, res) => {
  //   res.status(200).send({WHATABYTE: 'Food For Devs'});
  // });

  // router.post("/api/:id", (req, res) => {
  //   console.log('Params =' + JSON.stringify(req.params.id));
  //   console.log('Body = ' + JSON.stringify(req.body));
  //   // console.log('RES =' + res.toString());
    
  //   res.status(200).send({WHATABYTE: 'Food For Devs'});
  // });

/**
 * Server Activation
 */

  app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });