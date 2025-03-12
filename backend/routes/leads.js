const express = require('express');
const { 
  createLead, 
  getAllLeads, 
  getLeadById 
} = require('../controllers/leadController.js');

const router = express.Router();

// Create a new lead
router.post('/', createLead);

// Get all leads
router.get('/', getAllLeads);

// Get a specific lead by ID
router.get('/:id', getLeadById);

module.exports = router;

