import Employee from '../../../model/chit/employeeModel.js'
import City from '../../../model/chit/cityModel.js';
import State from '../../../model/chit/stateModel.js';
import Country from '../../../model/chit/countryModel.js';
import Department from '../../../model/chit/departmentModel.js';
import Designation from '../../../model/chit/designationModel.js';
import Profile from '../../../model/chit/profileModel.js';
import Branch from '../../../model/chit/branchModel.js';
import staff_user from '../../../model/chit/staff_userModel.js';
import { verifyToken } from '../../../utils/jwtToken.js';
import mongoose from 'mongoose';

// validate email, mobile number
const validateMobile = (mobile) => {
  return /^\d{10}$/.test(mobile);
};

const validateEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

// controller to add employee
export const addEmployee = async (req, res) => {
  const {
    reference_no,
    adhaar_card,
    resume,
    firstname,
    lastname,
    email,
    mobile,
    phone,
    address,
    pincode,
    id_city,
    id_state,
    id_country,
    id_branch,
    access_branch,
    date_of_birth,
    emp_code,
    id_dept,
    id_design,
    date_of_join,
    gender,
    image,
    comments,
    id_profile,
    is_lmx,
    created_by,
  } = req.body;

  try {
    // // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // // Validate mobile format
    if (!validateMobile(mobile)) {
      return res.status(400).json({ message: 'Invalid mobile number' });
    }

    // Check adhar number alread exisists or not
    // const existingAdhaar = await Employee.findOne({ adhaar_card });
    // if (existingAdhaar) {
    //   return res.status(400).json({ message: 'Adhaar card is already in use' });
    // }

    // Check if email is already in use
    // const existingEmail = await Employee.findOne({ email });
    // if (existingEmail) {
    //   return res.status(400).json({ message: 'Email is already in use' });
    // }

    // Check if emp_code is already in use
    const existingEmpCode = await Employee.findOne({ emp_code });
    if (existingEmpCode) {
      return res.status(400).json({ message: 'Employee code is already in use' });
    }

    // Validate foreign key references
    const city = await City.findById(id_city);
    if (!city) {
      return res.status(400).json({ message: 'Invalid city reference' });
    }

    const state = await State.findById(id_state);
    if (!state) {
      return res.status(400).json({ message: 'Invalid state reference' });
    }

    const country = await Country.findById(id_country);
    if (!country) {
      return res.status(400).json({ message: 'Invalid country reference' });
    }

    const department = await Department.findById(id_dept);
    if (!department) {
      return res.status(400).json({ message: 'Invalid department reference' });
    }

    const designation = await Designation.findById(id_design);
    if (!designation) {
      return res.status(400).json({ message: 'Invalid designation reference' });
    }

    const profile = await Profile.findById(id_profile);
    if (!profile) {
      return res.status(400).json({ message: 'Invalid profile reference' });
    }

    const branch = id_branch ? await Branch.findById(id_branch) : null;
    if (id_branch && !branch) {
      return res.status(400).json({ message: 'Invalid branch reference' });
    }

   // decode the token to get the ID of the user who created this staff user
  //  if(!req.cookies.ADMIN_token){
  //   return res.status(400).json({message:'Not allowed to perform this action'})
  // }
  // const decode = verifyToken(req.cookies.ADMIN_token);
  // const createdBy = decode.id_employee;
  const createdBy = '67626f7f7db4c1ee878290f8';

    // Create new employee instance
    const newEmployee = new Employee({
      reference_no,
      adhaar_card,
      resume,
      firstname,
      lastname,
      email,
      mobile,
      phone,
      address,
      pincode,
      id_city,
      id_state,
      id_country,
      id_branch,
      access_branch,
      date_of_birth,
      emp_code:mobile,
      id_dept,
      id_design,
      date_of_join,
      gender,
      image,
      comments,
      id_profile,
      is_lmx,
      created_by:createdBy,
    });

    // Save employee details
    await newEmployee.save();

    //Return response 
    res.status(201).json({ message: 'Employee added successfully', employee:newEmployee._id});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateEmployee = async (req, res) => {
  const {
    reference_no,
    adhaar_card,
    resume,
    firstname,
    lastname,
    email,
    mobile,
    phone,
    address,
    pincode,
    id_city,
    id_state,
    id_country,
    id_branch,
    access_branch,
    date_of_birth,
    id_dept,
    id_design,
    date_of_join,
    gender,
    image,
    comments,
    id_profile,
    is_lmx,
  } = req.body;

  const { id } = req.params;

  try {
    // Validate email format
    if (email && !validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Validate mobile format
    if (mobile && !validateMobile(mobile)) {
      return res.status(400).json({ message: 'Invalid mobile number' });
    }

    // Check if adhaar number already exists (except for the current employee)
    const existingAdhaar = await Employee.findOne({ adhaar_card, _id: { $ne: id } });
    if (existingAdhaar && existingAdhaar._id !== id) {
      return res.status(400).json({ message: 'Adhaar card is already in use' });
    }

    // Check if email is already in use (except for the current employee)
    const existingEmail = await Employee.findOne({ email, _id: { $ne: id } });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Check if emp_code is already in use (except for the current employee)
    // const existingEmpCode = await Employee.findOne({ emp_code, _id: { $ne: id } });
    // if (existingEmpCode) {
    //   return res.status(400).json({ message: 'Employee code is already in use' });
    // }

    // Validate foreign key references
    const city = id_city ? await City.findById(id_city) : null;
    if (id_city && !city) {
      return res.status(400).json({ message: 'Invalid city reference' });
    }

    const state = id_state ? await State.findById(id_state) : null;
    if (id_state && !state) {
      return res.status(400).json({ message: 'Invalid state reference' });
    }

    const country = id_country ? await Country.findById(id_country) : null;
    if (id_country && !country) {
      return res.status(400).json({ message: 'Invalid country reference' });
    }

    const department = id_dept ? await Department.findById(id_dept) : null;
    if (id_dept && !department) {
      return res.status(400).json({ message: 'Invalid department reference' });
    }

    const designation = id_design ? await Designation.findById(id_design) : null;
    if (id_design && !designation) {
      return res.status(400).json({ message: 'Invalid designation reference' });
    }

    const profile = id_profile ? await Profile.findById(id_profile) : null;
    if (id_profile && !profile) {
      return res.status(400).json({ message: 'Invalid profile reference' });
    }

    const branch = id_branch ? await Branch.findById(id_branch) : null;
    if (id_branch && !branch) {
      return res.status(400).json({ message: 'Invalid branch reference' });
    }

    // Find employee
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // decode the token to get the ID of the user who updates this staff user details
    if(!req.cookies.ADMIN_token){
      return res.status(400).json({message:'Not allowed to perform this action'})
    }
    const decode = verifyToken(req.cookies.ADMIN_token);
    const modifiedBy = decode.id_employee;

    // object with only updated field data
    const updateFields = {};
    if (reference_no) updateFields.reference_no = reference_no;
    if (adhaar_card) updateFields.adhaar_card = adhaar_card;
    if (resume) updateFields.resume = resume;
    if (firstname) updateFields.firstname = firstname;
    if (lastname) updateFields.lastname = lastname;
    if (email) updateFields.email = email;
    if (mobile) updateFields.mobile = mobile;
    if (phone) updateFields.phone = phone;
    if (address) updateFields.address = address;
    if (pincode) updateFields.pincode = pincode;
    if (id_city) updateFields.id_city = id_city;
    if (id_state) updateFields.id_state = id_state;
    if (id_country) updateFields.id_country = id_country;
    if (id_branch) updateFields.id_branch = id_branch;
    if (access_branch) updateFields.access_branch = access_branch;
    if (date_of_birth) updateFields.date_of_birth = date_of_birth;
    if (mobile) updateFields.emp_code = mobile;
    if (id_dept) updateFields.id_dept = id_dept;
    if (id_design) updateFields.id_design = id_design;
    if (date_of_join) updateFields.date_of_join = date_of_join;
    if (gender) updateFields.gender = gender;
    if (image) updateFields.image = image;
    if (comments) updateFields.comments = comments;
    if (id_profile) updateFields.id_profile = id_profile;
    if (is_lmx !== undefined) updateFields.is_lmx = is_lmx;
    if (modifiedBy) updateFields.modified_by = modifiedBy;
    updateFields.modified_date = new Date();

    // Update employee data
    const result = await Employee.updateOne({ _id: id }, { $set: updateFields });

    if (result.nModified === 0) {
      return res.status(400).json({ message: 'No changes to update' });
    }

    // Return response
    res.status(200).json({ message: 'Employee details updated' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete employee
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Employee ID is required' });
  }

  try {
    // Find the employee
    const employee = await Employee.findById(id);
    
    if (!employee) {
      return res.status(404).json({ message: 'No employee found' });
    }

    // Update the related staff user
    const staffUserUpdate = await staff_user.updateOne({ id_employee: employee._id }, { $set: { is_deleted: 2 } });
    
    // check if staff user update was successful
    if (staffUserUpdate.nModified === 0) {
      return res.status(400).json({ message: 'Error while updating staff user' });
    }

    // Update employee status
    const employeeUpdate = await Employee.updateOne({_id:id }, {$set: {is_deleted:2} });

    if (employeeUpdate.nModified === 0) {
      return res.status(400).json({ message: 'Error while deleting employee' });
    }

    return res.status(200).json({ message: 'Employee deleted successfully' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// activate employee
export const activateEmployee = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Employee ID is required' });
  }

  try {
    // Find the staff user by ID
    const employee = await Employee.findById(id);
    
    if (!employee) {
      return res.status(404).json({ message: 'No employee found' });
    }

    // proceed if the employee is not already active
    if (employee.is_deleted === 1) {
      return res.status(400).json({ message: 'User is already active' });
    }

    // update staff user status
    const result = await staff_user.updateOne({ id_employee: id},{$set:{is_deleted: 1}});
    
    if (result.nModified === 0) {
      return res.status(400).json({ message: 'Error while activating user or user is already active' });
    }

    // Update employee status
    const employeeUpdate = await Employee.updateOne({_id:id }, {$set: {is_deleted:1} });

    if (employeeUpdate.nModified === 0) {
      return res.status(400).json({ message: 'Error while activating employee' });
    }

    return res.status(200).json({ message: 'Employee activated successfully' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//all employees with pagination
export const allEmployess= async (req,res) => {
  try {
    // accepts limit and page number from the query
    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1

    // find number of documents to skip
    const skip = (page - 1) * limit;

    // get total number of employee collection documents
    const totalEmployees = await Employee.countDocuments();

    // get the paginated employees data
    const employees = await Employee.find().skip(skip).limit(limit);

    // response with employee , pagination data
    return res.status(200).json({
      totalEmployees,
      totalPages: Math.ceil(totalEmployees / limit),
      currentPage: page,
      employees,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:'Internal server error'})
  }
}

//get employee by Id
export const getEmployeeById = async (req, res) => {
  try {
      const id = req.body.id

      if (!id) {
        return res.status(400).json({ message: 'User id is required' });
      }

      const employeeData = await Employee.findById(id);

      if (employeeData) {
        return res.status(200).json({ message: 'Employee data retrieved successfully', data: employeeData });
      } else {
        return res.status(204).json({ message: 'Employee not found' });
      }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all employees (no pagination, no filter)
export const getAllEmployees = async (req, res) => {
  try {
    // Fetch all employees from the Employee collection
    const employeeData = await Employee.find();

    // Check if employee data is found
    if (employeeData && employeeData.length > 0) {
      return res.status(200).json({ message: 'Employee data retrieved successfully', data: employeeData });
    } else {
      return res.status(204).json({ message: 'No employees found' });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// // Filtered employees with pagination
// export const filteredPaginateEmployees = async (req, res) => {
//   try {
//     // accepts limit and page number from the query
//     const limit = parseInt(req.query.limit) || 10;
//     const page = parseInt(req.query.page) || 1;

//     // Find number of documents to skip for pagination
//     const skip = (page - 1) * limit;

//     // Get filter object from the request body
//     const filter = req.body.filter || {}; 

//     // get number of doucments that matches the filter
//     const totalEmployees = await Employee.countDocuments(filter);

//     // get paginated employee filter data
//     const employees = await Employee.find({id_dept:filter}).skip(skip).limit(limit);

//     // response employee data with pagination info
//     return res.status(200).json({
//       totalEmployees,
//       totalPages: Math.ceil(totalEmployees / limit),
//       currentPage: page,
//       employees,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// Filtered employees with pagination and date range
export const filteredPaginateEmployees = async (req, res) => {
  try {
    // Accepts limit, page number
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    // Find number of documents to skip for pagination
    const skip = (page - 1) * limit;

    // Get the filter object from the request body
    console.log("Filter from request body:", req.body.filter);
    let filter = {};

    // convert id string to objectId
    if (req.body.filter) {
      filter.id_dept =new mongoose.Types.ObjectId(req.body.filter);
    }

    // Get the date range from the body
    const fromDate = req.body.fromDate ? new Date(req.body.fromDate) : null;
    const toDate = req.body.toDate ? new Date(req.body.toDate) : null;

    // Prepare the filter for the date range if provided
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
          totalEmployees: [
            { $count: "total" }
          ],
          employees: [
            { $skip: skip },
            { $limit: limit }
          ]
        }
      }
    ];

    const result = await Employee.aggregate(aggregationPipeline);

    // calculate the total number of employees
    const totalEmployees = result.length > 0 && result[0].totalEmployees.length > 0
      ? result[0].totalEmployees[0].total
      : 0;

    // Return response with data and pagination info
    return res.status(200).json({
      totalEmployees,
      totalPages: Math.ceil(totalEmployees / limit),
      currentPage: page,
      employees: result.length > 0 ? result[0].employees : [],
    });
  } catch (error) {
    console.log("Error in aggregation:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
