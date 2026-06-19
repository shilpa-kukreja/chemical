import express from 'express';
import { getDashboardStats } from '../controllers/adminController.js';

const adminRouter = express.Router();

// Dashboard analytics
adminRouter.get('/dashboard-stats', getDashboardStats);

export default adminRouter;