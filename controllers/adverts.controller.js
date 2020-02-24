const mongoose = require('mongoose');
const Advert = require('../models/advert.model');
const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
  if (!req.body.title | !req.body.description | !req.body.price) {
    res.status(400).json({
      message: 'Some elements cannot be empty'
    });
  }

  Advert.findOne({
    title: req.body.title
  })
  .then(advert => {
      if (advert != null) {
        res.status(422).json({
          message: 'Advert already registered'
        });
      } else {
        advert = new Advert({
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          city: req.body.city,
          user: req.user._id
        });
        advert
          .save()
          .then(() => {
            console.log(`Advert ${advert.title} has been created`);
            res.status(200).json(advert);
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
      }
    })
    .catch(error => next(error));
}

module.exports.show = (req, res, next) => {
  if (req.query.user) {
    User.findOne({
      userId: req.query.user
    })
    .then(user => {
      if (user) {
        Advert.find({user: user._id})
        .then(adverts => {
          if (adverts) {
            res.status(200).json(adverts);
          } else {
            res.status(404).json({
              message: 'Adverts not found',
              error: error.errors
            });
          }
        }).catch(error => next(error));
      } else {
        res.status(404).json({
          message: 'User not found',
          error: error.errors
        });
      }
    }).catch(error => next(error));

  } else {
    Advert.find({user: req.query.user})
      .then(adverts => {
        if (adverts) {
          res.status(200).json(adverts);
        } else {
          res.status(404).json({
            message: 'Adverts not found',
            error: error.errors
          });
        }
      }).catch(error => next(error));

  }
}

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  Advert.findById(id)
    .then(advert => {
      if (advert) {
        res.status(200).json(advert);
      } else {
        res.status(404).json({
          message: 'Advert not found',
          error: error.errors
        });
      }
    }).catch(error => next(error));
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  Advert.findByIdAndUpdate(id, {
      $set: req.body
    }, {
      new: true
    })
    .then(advert => {
      if (advert) {
        advert.save()
          .then(() => {
            res.status(200).json(advert);
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
          message: 'Advert not found',
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