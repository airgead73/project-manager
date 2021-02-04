const asyncHandler = require('../middleware/handleAsync');
const Chapter = require('../models/Chapter');
const createError = require('http-errors');

/**
 * @route   POST /
 * @desc    create 
 * @access  private
 */

exports.create = asyncHandler(async function(req, res, next) {

  const reqBody = {...req.body}
  const projectID = req.params.projectID;
  if(projectID) reqBody.project = projectID;

  const chapter = new Chapter(reqBody);
  await chapter.save();
  
  return res
    .status(200)
    .json({
      success: true,
      message: `Chapter ${chapter.number} created`,
      chapter
    });

});

/**
 * @route   GET /
 * @desc    read
 * @access  private
 */

exports.read = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.results;

  return res
    .status(200)
    .json({
      success,
      count,
      message: count > 0 ? `${count} chapters found` : 'No chapters found',
      chapters: count > 0 ? data : null
    });

});

/**
 * @route   GET /:ID
 * @desc    read one
 * @access  private
 */ 

exports.read_one = asyncHandler(async function(req, res, next) {

  const chapter = await Chapter.findById(req.params.chapterID);

  if(!chapter) return next(createError(404, 'Chapter not found.'));

  return res
    .status(200)
    .json({ 
      success: true,
      count: 1, 
      message: `Chapter ${chapter.number} found` ,
      data: chapter
    });    
  
});

/**
 * @route   PUT /:ID
 * @desc    update chapter
 * @access  private
 */ 

exports.update = asyncHandler(async function(req, res, next) {
  
  // find chapter
  let chapter = await Chapter.findById(req.params.chapterID);

  if(!chapter) return next(createError(404, 'Chapter not found'));

  // build fields
  const {
    title,
    number,
    project,
    notes
  } = req.body;

  const chapterFields = {};

  if(title) chapterFields.title = title;
  if(number) chapterFields.number = number;
  if(project) chapterFields.project = project;
  if(notes) chapterFields.notes = notes;

  // update chapter
  chapter = await Chapter.findByIdAndUpdate(req.params.chapterID, { $set: chapterFields }, { new: true });

  return res
    .status(200)
    .json({
      success: true,
      message: `Chapter ${chapter.number} has been updated`,
      chapter
    });

}); 

/**
 * @route   DELETE /:ID
 * @desc    delete chapter
 * @access  private
 */ 

exports.delete_one = asyncHandler(async function(req, res, next) {

  // find chapter
  let chapter = await Chapter.findById(req.params.chapterID);

  if(!chapter) return next(createError(404, 'Chapter not found'));

  // delete chapter
  await chapter.remove();

  return res
    .status(200)
    .json({
      success: true,
      message: `Chapter ${chapter.number} has been deleted`
    });

});

/**
 * @route   DELETE /
 * @desc    delete all
 * @access  private
 */

exports.delete_all = asyncHandler(async function(req, res, next) {

  Chapter.collection.drop();

  return res
  .status(200)
  .json({ 
    success: true, 
    message: 'Chapter collection deleted' 
  });  

});