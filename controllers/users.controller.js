const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
  if (!req.body.email | !req.body.password) {
    res.status(400).json({
      message: 'Email or password cannot be empty'
    });
  }
  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (user != null) {
        res.status(422).json({
          message: 'User already registered'
        });
      } else {
        user = new User({
          email: req.body.email,
          password: req.body.password,
        });
        user
          .save()
          .then(() => {
            console.log(`User ${user.email} has been created`);
            res.status(200).json(user);
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              res.status(422).json({
                message: 'Email or password have incorrect syntax',
                error: error.errors
              });
            } else {
              next(error);
            }
          });
      }
    })
    .catch(error => next(error));
}

module.exports.show = (req, res, next) => {
  User.find()
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({
          message: 'User not found',
          error: error.errors
        });
      }
    }).catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  User.findOne({
    userId: id
  })
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: 'User not found',
        error: error.errors
      });
    }
  }).catch(error => next(error));
}

module.exports.getByObjectId = (req, res, next) => {
  const id = req.params.id;
  User.findOne({
    _id: id
  })
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: 'User not found',
        error: error.errors
      });
    }
  }).catch(error => next(error));
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  User.findOneAndUpdate({userId: id}, {
      $set: req.body
    }, {
      new: true
    })
    .then(user => {
      if (user) {
        user.save()
          .then(() => {
            res.status(200).json(user);
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              res.status(422).json({
                message: 'mongoose.Error.ValidationError',
                error: error.errors
              });
            } else {
              next(error);
            }
          });
      } else {
        res.status(404).json({
          message: 'User not found',
          error: error.errors
        });
      }
    }).catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(422).json({
          message: 'mongoose.Error.ValidationError',
          error: error.errors
        });
      } else {
        res.status(500).json({
          message: error.message,
        });
      }
    });
}