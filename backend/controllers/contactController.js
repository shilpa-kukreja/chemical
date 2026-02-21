
import ContactEnquiry from "../models/ContactEnquiryModel.js";

// @access  Public
export const createContactEnquiry = async (req, res) => {
  try {
    const { name, email, phone, address, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !address || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Get IP and user agent for tracking
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // Create enquiry
    const enquiry = await ContactEnquiry.create({
      name,
      email,
      phone,
      address,
      message,
      ipAddress,
      userAgent
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! We will contact you soon.',
      data: {
        id: enquiry._id,
        name: enquiry.name,
        email: enquiry.email,
        createdAt: enquiry.createdAt
      }
    });

  } catch (error) {
    console.error('Create contact enquiry error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while sending message. Please try again.'
    });
  }
};

// @desc    Get all contact enquiries (with pagination and filters)
// @route   GET /api/contact
// @access  Public (Admin panel)
export const getContactEnquiries = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    // Build filter object
    const filter = {};
    if (status && status !== 'all') filter.status = status;
    
    // Search functionality
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const enquiries = await ContactEnquiry.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const total = await ContactEnquiry.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: enquiries,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get contact enquiries error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching enquiries'
    });
  }
};

// @desc    Get single contact enquiry
// @route   GET /api/contact/:id
// @access  Public (Admin panel)
export const getContactEnquiryById = async (req, res) => {
  try {
    const enquiry = await ContactEnquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry
    });

  } catch (error) {
    console.error('Get contact enquiry error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid enquiry ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching enquiry'
    });
  }
};

// @desc    Update contact enquiry status
// @route   PUT /api/contact/:id
// @access  Public (Admin panel)
export const updateContactEnquiry = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const enquiry = await ContactEnquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    if (status) enquiry.status = status;
    if (notes !== undefined) enquiry.notes = notes;
    enquiry.updatedAt = Date.now();

    await enquiry.save();

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      data: enquiry
    });

  } catch (error) {
    console.error('Update contact enquiry error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid enquiry ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating enquiry'
    });
  }
};

// @desc    Delete contact enquiry
// @route   DELETE /api/contact/:id
// @access  Public (Admin panel)
export const deleteContactEnquiry = async (req, res) => {
  try {
    const enquiry = await ContactEnquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    await enquiry.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully'
    });

  } catch (error) {
    console.error('Delete contact enquiry error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid enquiry ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while deleting enquiry'
    });
  }
};

// @desc    Get contact enquiry statistics
// @route   GET /api/contact/stats
// @access  Public (Admin panel)
export const getContactEnquiryStats = async (req, res) => {
  try {
    const stats = await ContactEnquiry.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const total = await ContactEnquiry.countDocuments();
    
    // Get recent enquiries (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentCount = await ContactEnquiry.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    // Get today's enquiries
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayCount = await ContactEnquiry.countDocuments({
      createdAt: { $gte: today }
    });

    // Format stats
    const byStatus = {};
    stats.forEach(item => {
      byStatus[item._id] = item.count;
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        recent: recentCount,
        today: todayCount,
        byStatus
      }
    });

  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
};

// @desc    Bulk delete contact enquiries
// @route   POST /api/contact/bulk-delete
// @access  Public (Admin panel)
export const bulkDeleteContactEnquiries = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of enquiry IDs'
      });
    }

    const result = await ContactEnquiry.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} enquiries deleted successfully`
    });

  } catch (error) {
    console.error('Bulk delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting enquiries'
    });
  }
};