import express from 'express';
import { 
  createLead, 
  getAllLeads, 
  getLeadById 
} from '../controllers/leadController.js';

const router = express.Router();

// Create a new lead
router.post('/', createLead);

// Get all leads
router.get('/', getAllLeads);

// Get a specific lead by ID
router.get('/:id', getLeadById);

export default router;

