import mongoose from 'mongoose';

const errorLogSchema = new mongoose.Schema({
  errorMessage: {
    type: String,
    required: true
  },
  endpoint: {
    type: String,
    required: true
  },
  statusCode: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  requestData: {
    type: Object
  },
  stack: {
    type: String
  }
});

// Create index for faster queries
errorLogSchema.index({ timestamp: -1 });

const ErrorLog = mongoose.model('ErrorLog', errorLogSchema);

export default ErrorLog;

