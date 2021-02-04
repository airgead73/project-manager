const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Add title.'],
    maxlength: [100, 'Title should be less than 100 characters.'],
    trim: true
  },
  code: {
    type: String,
    required: [true, 'Add code.'],
    maxlength: [20, 'Code should be less than 20 characters.'],
    trim: true
  },
  edition: {
    type: Number,
    min: 1,
  },
  author: {
    type: String,
    maxlength: [500, 'Description should be less than 500 characters.'],
  },
  client: {
    type: String,
    maxlength: [50, 'Code should be less than 50 characters.'],
  },
  desc: {
    type: String,
    maxlength: [500, 'Description should be less than 500 characters.'],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Casecade delete chapters when a project is deleted
ProjectSchema.pre('remove', async function(next) {

  await this.model('Chapter').deleteMany({ project: this._id });
  next();

});

//Reverse populate with virtuals
ProjectSchema.virtual('chapters', {
  ref: 'Chapter',
  localField: '_id',
  foreignField: 'project',
  justOne: false
});

// ProjectSchema.virtual('milestones', {
//   ref: 'Milestone',
//   localField: '_id',
//   foreignField: 'project',
//   justOne: false
// });

// ProjectSchema.virtual('tasks', {
//   ref: 'Task',
//   localField: '_id',
//   foreignField: 'project',
//   justOne: false
// });

module.exports = mongoose.model('Project', ProjectSchema);