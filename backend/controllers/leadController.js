const Lead = require('../models/Lead.js');
// const { sendToThirdParty } = require('../services/thirdPartyService.js');

// Create a new lead
const createLead = async (req, res, next) => {
  try {
    const { name, email, phone, source, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required fields' });
    }
    
    // Create new lead
    const lead = new Lead({
      name,
      email,
      phone,
      source: source || 'direct',
      message
    });
    
    // Save to database
    await lead.save();
    
    // Send to third-party service
    // try {
    //   await sendToThirdParty(lead);
    // } catch (error) {
    //   // Log error but don't fail the request
    //   console.error('Error sending to third-party service:', error);
    // }
    
    res.status(201).json({
      message: 'Lead created successfully',
      lead: {
        id: lead._id,
        name: lead.name,
        email: lead.email,
        createdAt: lead.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get all leads
const getAllLeads = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    
    // Sorting
    const sortField = req.query.sortField || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    
    // Find leads with pagination and sorting
    const leads = await Lead.find()
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const total = await Lead.countDocuments();
    
    res.status(200).json(leads);
  } catch (error) {
    next(error);
  }
};

// Get a specific lead by ID
const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    
    res.status(200).json(lead);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLead,
  getAllLeads,
  getLeadById
}
