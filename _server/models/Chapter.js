const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [100, 'Title should be less than 100 characters.'],
    required: [true, 'Add title.'],
  },
  number: {
    type: Number,
    min: 1,
    required: [true, 'Add chapter number.'],
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: [true, 'Add project id.'],
  },
  notes: {
    type: String,
    maxlength: [500, 'Description should be less than 500 characters.']
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Reverse populate with virtuals

// ChapterSchema.virtual('photos', {
//   ref: 'Photo',
//   localField: '_id',
//   foreignField: 'chapter',
//   justOne: false
// });

// ChapterSchema.virtual('figures', {
//   ref: 'Figure',
//   localField: '_id',
//   foreignField: 'chapter',
//   justOne: false
// });

module.exports = mongoose.model('Chapter', ChapterSchema);