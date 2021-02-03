const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const policies = require('./config/csp');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const { RATE_LIMIT } = require('./config/constants');
const session = require('express-session');
const { ISDEV, SESSION_EXP, SESSION_SECRET } = require('./config/constants');
const SessionMemory = require('memorystore')(session);
const xss = require('xss-clean');

/**
 * @desc INITIALIZE APP
 */
const app = express();
connectDB();

/**
 * @desc SECURITY
 */

app.use(helmet());
app.use(helmet.contentSecurityPolicy(policies));
app.use(xss());
app.use(hpp());
app.use(cors());
app.use(mongoSanitize());
const limiter = rateLimit({
  windowMs: 10 * 60 * 10,
  max: RATE_LIMIT
});
app.use(limiter);

/**
 * @desc MIDDLEWARE
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new SessionMemory({
    checkPeriod: SESSION_EXP
  })
 }));

/**
 * @desc DEV MIDDLEWARE
 */
if(ISDEV) {
  const logger = require('morgan');
  app.use(logger('dev'));
}

/**
 * @desc LOAD ROUTES
 */

const { apiRouter } = require('./_server/routes/index');

app.use('/api', apiRouter);


/**
 * @desc ERROR HANDLING
 */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send error response
  res.status(err.status || 500);
  res.send(`status: ${err.status}\n error: ${err.name}\n message: ${err.message}\n code: ${err.code}`);
});

module.exports = app;
