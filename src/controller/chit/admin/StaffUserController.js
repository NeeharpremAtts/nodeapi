import staff_user from '../../../model/chit/staff_userModel.js';
import { verifyToken } from '../../../utils/jwtToken.js';
import bcrypt from 'bcrypt'
import mongoose from 'mongoose';

// validate email, mobile number
const validateMobile = (mobile) => {
  return /^\d{10}$/.test(mobile);
};

// controller to add employee
export const addStaffUser = async (req, res) => {
  const {
    id_employee,
    password,
    username,
    role_id,
    mobile,
    access_branch,
  } = req.body;

  try {
    // Validate mobile format
    if (mobile && !validateMobile(mobile)) {
      return res.status(400).json({ message: 'Invalid mobile number' });
    }

    // decode the token to get the ID of the user who created this staff user
    if(!req.cookies.ADMIN_token){
      return res.status(400).json({message:'Not allowed to perform this action'})
    }
    const decode = verifyToken(req.cookies.ADMIN_token);
    const createdBy = decode.id_employee;
    // const createdBy = '6763cf59ac5a38807e0e9816';

    // Get the current date and time
    const currentDate = new Date();

    //hash password
    if(!password){
      return res.status(400).json({message:'Password required'})
    }

    let hashedPassword = await bcrypt.hash(password,12);

    // Create new employee instance
    const staffuser = new staff_user({
      id_employee,
      password:hashedPassword,
      username,
      created_by: createdBy,
      role_id,
      modified_by: createdBy,
      created_date: currentDate,
      modified_date: currentDate,
      mobile: mobile,
      access_branch,
    });

    // Save details
    await staffuser.save();

    // Return response
    res.status(201).json({ message: 'Staff user added successfully', staffuser: staffuser._id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update staff user details
export const updateStaffUser = async (req, res) => {
  const {
    mobile,
    access_branch,
    username,
    password,
    role_id,
  } = req.body;

  const { id } = req.params;

  try {
    // Validate mobile format
    if (mobile && !validateMobile(mobile)) {
      return res.status(400).json({ message: 'Invalid mobile number' });
    }

    // Find staff user by ID
    const employee = await staff_user.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    // decode the token to get the ID of the user who updates this staff user details
    if(!req.cookies.ADMIN_token){
      return res.status(400).json({message:'Not allowed to perform this action'})
    }
    const decode = verifyToken(req.cookies.ADMIN_token);
    const modifiedBy = decode.id_employee;

    // Object with only updated fields
    const updateFields = {};

    // Add fields to update only if they exist in the request body
    if (mobile) updateFields.mobile = mobile;
    if (access_branch) updateFields.access_branch = access_branch;
    if (username) updateFields.username = username;
    if (role_id) updateFields.role_id = role_id;
    if (password) updateFields.password=password;
    updateFields.modified_by = modifiedBy;
    // updateFields.modified_date = new Date();

    // Update staff user data in the database
    const result = await staff_user.updateOne({ _id: id }, { $set: updateFields });

    // If no document was modified, return an error message
    if (result.nModified === 0) {
      return res.status(400).json({ message: 'No changes to update' });
    }

    // Return success response
    res.status(200).json({ message: 'Staff user details updated successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// delete staff user
export const deleteStaffuser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Find the staff user by ID
    const staffuser = await staff_user.findById(id);
    
    if (!staffuser) {
      return res.status(404).json({ message: 'No user found' });
    }

    // Updating staff_user is_deleted field to 2
    const result = await staff_user.updateOne({ _id: id },{ $set:{is_deleted:2} });
    
    if (result.nModified === 0) {
      return res.status(400).json({ message: 'Error while deleting user or user already deleted' });
    }

    return res.status(200).json({ message: 'Staff deleted successfully' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// activate staff user
export const activateStaffuser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Find the staff user by ID
    const staffuser = await staff_user.findById(id);
    
    if (!staffuser) {
      return res.status(404).json({ message: 'No user found' });
    }

    // proceed if the user is not already active
    if (staffuser.is_deleted === 1) {
      return res.status(400).json({ message: 'User is already active' });
    }

    // update staff user's is_deleted field to 1
    const result = await staff_user.updateOne({ _id: id},{$set:{is_deleted: 1}});
    
    if (result.nModified === 0) {
      return res.status(400).json({ message: 'Error while activating user or user is already active' });
    }

    return res.status(200).json({ message: 'Staff activated successfully' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Filtered employees with pagination and date range
export const filteredPaginateStaffs = async (req, res) => {
  try {
    // Accepts limit, page number
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    // Find number of documents to skip for pagination
    const skip = (page - 1) * limit;

    // Get the filter object from the request body
    let filter = {};

    // Convert id string to ObjectId
    if (req.body.filter) {
      filter.id_dept = new mongoose.Types.ObjectId(req.body.filter);
    }

    // Get the date range from the body
    const fromDate = req.body.fromDate ? new Date(req.body.fromDate) : null;
    const toDate = req.body.toDate ? new Date(req.body.toDate) : null;

    if (fromDate && toDate) {
      filter.createdAt = { $gte: fromDate, $lte: toDate };
    } else if (fromDate) {
      filter.createdAt = { $gte: fromDate };
    } else if (toDate) {
      filter.createdAt = { $lte: toDate };
    }

    // Aggregation pipeline query
    const aggregationPipeline = [
      { $match: filter },
      { 
        $facet: {
          totalStaffs: [
            { $count: "total" }
          ],
          staffs: [
            { $skip: skip },
            { $limit: limit }
          ]
        }
      }
    ];

    const result = await staff_user.aggregate(aggregationPipeline);

    // Calculate the total number of staffs
    const totalStaffs = result.length > 0 && result[0].totalStaffs.length > 0
      ? result[0].totalStaffs[0].total
      : 0;

    // Return response with data and pagination info
    return res.status(200).json({
      totalStaffs,
      totalPages: Math.ceil(totalStaffs / limit),
      currentPage: page,
      staffs: result.length > 0 ? result[0].staffs : [],
    });
  } catch (error) {
    console.log("Error in aggregation:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
