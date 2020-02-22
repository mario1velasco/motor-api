const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const advertSchema = new mongoose.Schema({
  advertId: Number,
  title: {
    type: String,
    required: [true, 'Advert needs a title'],
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Advert needs a description'],
  },
  city: {
    type: String,
  },
  price: {
    type: String,
    required: [true, 'Advert needs a price'],
  },
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc.advertId;
      delete ret._id;
      delete ret.advertId;
      delete ret.__v;

      return ret;
    }
  }
});

advertSchema.plugin(AutoIncrement, {inc_field: 'advertId'});

const Advert = mongoose.model('Advert', advertSchema);
module.exports = Advert;