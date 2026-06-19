import blogModel from "../models/blogModels.js";
import ContactEnquiry from "../models/ContactEnquiryModel.js";
import EnquiryModal from "../models/enquiryModel.js";

/**
 * @desc    Get aggregated dashboard statistics
 * @route   GET /api/admin/dashboard-stats
 * @access  Public (Admin panel - add auth later)
 */
export const getDashboardStats = async (req, res) => {
  try {
    // ------------------- Blogs -------------------
    const totalBlogs = await blogModel.countDocuments();
    const recentBlogs = await blogModel.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title createdAt blogImg');

    // ------------------- Contact Enquiries -------------------
    const totalContacts = await ContactEnquiry.countDocuments();
    const recentContacts = await ContactEnquiry.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email phone status createdAt');

    // Status breakdown for contacts
    const contactStatusStats = await ContactEnquiry.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const contactStatusBreakdown = {};
    contactStatusStats.forEach(item => {
      contactStatusBreakdown[item._id] = item.count;
    });

    // ------------------- Product Enquiries -------------------
    const totalEnquiries = await EnquiryModal.countDocuments();
    const recentEnquiries = await EnquiryModal.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('productName name email status createdAt');

    const enquiryStatusStats = await EnquiryModal.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const enquiryStatusBreakdown = {};
    enquiryStatusStats.forEach(item => {
      enquiryStatusBreakdown[item._id] = item.count;
    });

    // ------------------- Time‑based trends (last 7 days) -------------------
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const newBlogsLast7Days = await blogModel.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });
    const newContactsLast7Days = await ContactEnquiry.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });
    const newEnquiriesLast7Days = await EnquiryModal.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    // ------------------- Response -------------------
    res.status(200).json({
      success: true,
      data: {
        blogs: {
          total: totalBlogs,
          recent: recentBlogs,
          newLast7Days: newBlogsLast7Days
        },
        contactEnquiries: {
          total: totalContacts,
          recent: recentContacts,
          statusBreakdown: contactStatusBreakdown,
          newLast7Days: newContactsLast7Days
        },
        productEnquiries: {
          total: totalEnquiries,
          recent: recentEnquiries,
          statusBreakdown: enquiryStatusBreakdown,
          newLast7Days: newEnquiriesLast7Days
        }
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard statistics'
    });
  }
};