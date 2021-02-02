module.exports = {
  PORT: process.env.PORT,
  DB_DEV: process.env.DEV_MONGO_URI,
  DB: process.env.MONGO_URI,
  ISDEV: process.env.NODE_ENV === 'development',
  RATE_LIMIT: 100, 
  SESSION_EXP: 86400000,
  SESSION_SECRET: process.env.SESSION_SECRET,  
};