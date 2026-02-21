import express from 'express';
import {
  createContactEnquiry,
  getContactEnquiries,
  getContactEnquiryById,
  updateContactEnquiry,
  deleteContactEnquiry,
  getContactEnquiryStats,
  bulkDeleteContactEnquiries
} from '../controllers/contactController.js';

const contactRoutes = express.Router();

// Public routes
contactRoutes.post('/', createContactEnquiry);

// Admin routes (no auth required)
contactRoutes.get('/', getContactEnquiries);
contactRoutes.get('/stats', getContactEnquiryStats);
contactRoutes.get('/:id', getContactEnquiryById);
contactRoutes.put('/:id', updateContactEnquiry);
contactRoutes.delete('/:id', deleteContactEnquiry);
contactRoutes.post('/bulk-delete', bulkDeleteContactEnquiries);

export default contactRoutes;