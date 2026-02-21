import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
  getEnquiryStats,
  bulkDeleteEnquiries
} from '../controllers/enquiryController.js';

const enuiryRoutes = express.Router();

// Public routes
enuiryRoutes.post('/', createEnquiry);

// Admin routes (no auth required)
enuiryRoutes.get('/', getEnquiries);
enuiryRoutes.get('/stats', getEnquiryStats);
enuiryRoutes.get('/:id', getEnquiryById);
enuiryRoutes.put('/:id', updateEnquiry);
enuiryRoutes.delete('/:id', deleteEnquiry);
enuiryRoutes.post('/bulk-delete', bulkDeleteEnquiries);

export default enuiryRoutes;