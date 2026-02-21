import EnquiryModal from "../models/enquiryModel.js";
import { sendEnquiryEmails } from "../utils/emailService.js";





// @access  Public
// export const createEnquiry = async (req, res) => {
//   try {
//     const { productName, name, email, phone, requirement } = req.body;

//     // Validate required fields
//     if (!productName || !name || !email || !phone || !requirement) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide all required fields'
//       });
//     }

//     // Create enquiry
//     const enquiry = await EnquiryModal.create({
//       productName,
//       name,
//       email,
//       phone,
//       requirement
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Enquiry submitted successfully',
//       data: {
//         id: enquiry._id,
//         name: enquiry.name,
//         email: enquiry.email,
//         createdAt: enquiry.createdAt
//       }
//     });

//   } catch (error) {
//     console.error('Create enquiry error:', error);
    
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({
//         success: false,
//         message: 'Validation error',
//         errors: Object.values(error.errors).map(err => err.message)
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: 'Server error while creating enquiry'
//     });
//   }
// };
export const createEnquiry = async (req, res) => {
  try {
    const { productName, name, email, phone, requirement } = req.body;

    // Validate required fields
    if (!productName || !name || !email || !phone || !requirement) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Create enquiry
    const enquiry = await EnquiryModal.create({
      productName,
      name,
      email,
      phone,
      requirement
    });

    // Send emails asynchronously (don't await to not block response)
    sendEnquiryEmails(enquiry).then(results => {
      console.log('Email sending results:', results);
    }).catch(emailError => {
      console.error('Failed to send emails:', emailError);
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: {
        id: enquiry._id,
        name: enquiry.name,
        email: enquiry.email,
        createdAt: enquiry.createdAt
      }
    });

  } catch (error) {
    console.error('Create enquiry error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating enquiry'
    });
  }
};

// @desc    Get all enquiries (with pagination and filters)
// @route   GET /api/enquiries
// @access  Public (Admin panel)
export const getEnquiries = async (req, res) => {
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
        { productName: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const enquiries = await EnquiryModal.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const total = await EnquiryModal.countDocuments(filter);

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
    console.error('Get enquiries error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching enquiries'
    });
  }
};

// @desc    Get single enquiry
// @route   GET /api/enquiries/:id
// @access  Public (Admin panel)
export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await EnquiryModal.findById(req.params.id);

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
    console.error('Get enquiry error:', error);
    
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

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id
// @access  Public (Admin panel)
export const updateEnquiry = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const enquiry = await EnquiryModal.findById(req.params.id);

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
    console.error('Update enquiry error:', error);
    
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

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Public (Admin panel)
export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await EnquiryModal.findById(req.params.id);

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
    console.error('Delete enquiry error:', error);
    
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

// @desc    Get enquiry statistics
// @route   GET /api/enquiries/stats
// @access  Public (Admin panel)
export const getEnquiryStats = async (req, res) => {
  try {
    const stats = await EnquiryModal.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const total = await EnquiryModal.countDocuments();
    
    // Get recent enquiries (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentCount = await EnquiryModal.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
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
        byStatus
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
};

// @desc    Bulk delete enquiries
// @route   DELETE /api/enquiries/bulk
// @access  Public (Admin panel)
export const bulkDeleteEnquiries = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of enquiry IDs'
      });
    }

    const result = await EnquiryModal.deleteMany({ _id: { $in: ids } });

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