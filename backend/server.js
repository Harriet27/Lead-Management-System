const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const leadsRouter = require('./routes/leads.js')
const authRouter = require('./routes/auth.js')
const { errorLogger } = require('./middleware/errorLogger.js')
const { authenticateToken } = require('./middleware/auth.js')

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()
const PORT = process.env.PORT || 3002

// Connect to MongoDB
mongoose.connect('mongodb://aldrich:xAj8pFJvcdKWCi4m@ac-ux1yt6p-shard-00-00.dvdtsdm.mongodb.net:27017,ac-ux1yt6p-shard-00-01.dvdtsdm.mongodb.net:27017,ac-ux1yt6p-shard-00-02.dvdtsdm.mongodb.net:27017/lead_management?ssl=true&replicaSet=atlas-dlip7w-shard-0&authSource=admin&retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })

// Middleware
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api/', apiLimiter)

// Routes
app.use('/api/auth', authRouter)
// app.use('/api/leads', authenticateToken, leadsRouter)
app.use('/api/leads', leadsRouter)

// Error handling middleware
app.use(errorLogger)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

