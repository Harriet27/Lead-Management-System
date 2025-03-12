const ErrorLog = require('../models/ErrorLog.js');

const errorLogger = async (err, req, res, next) => {
  try {
    // Create error log entry
    const errorLog = new ErrorLog({
      errorMessage: err.message,
      endpoint: req.originalUrl,
      statusCode: err.statusCode || 500,
      requestData: {
        body: req.body,
        params: req.params,
        query: req.query,
        method: req.method
      },
      stack: err.stack
    });
    
    // Save error log
    await errorLog.save();
    
    // Continue to next middleware
    next(err);
  } catch (logError) {
    console.error('Error logging failed:', logError);
    next(err);
  }
};

module.exports = { errorLogger };
