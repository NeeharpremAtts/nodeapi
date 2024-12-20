import express from 'express';
import { adminLogin } from '../../../controller/chit/admin/LoginController.js';
import { addEmployee,
    updateEmployee,
    activateEmployee,
    deleteEmployee,
    allEmployess,
    getEmployeeById,
    getAllEmployees,
    filteredPaginateEmployees
} from '../../../controller/chit/admin/EmployeeController.js';
import {deleteStaffuser,
    activateStaffuser,
    addStaffUser,
    updateStaffUser,
    filteredPaginateStaffs
} from '../../../controller/chit/admin/StaffUserController.js'

const router = express.Router();

//login route
router.post('/login',adminLogin);

//CRUD operation routers

//add employee data
router.post('/employee', addEmployee);

//update employee data
router.patch('/employee/:id', updateEmployee);

//delete/inactive staffuser
router.delete('/staffuser/:id', deleteStaffuser);

//activate staffuser
router.patch('/staffuser/:id/activate', activateStaffuser);

//delete/inacative employee
router.delete('/employee/:id', deleteEmployee);

//activate inactive employee
router.patch('/employee/:id/activate', activateEmployee);

//get all employees with pagination
router.post('/employee',allEmployess);

//get employee by Id
router.post('/getemployeeid',getEmployeeById);

//get all employees no pagination, no filter
router.post('/getallemployees',getAllEmployees);

//get employees data department filter, start-end date and pagination options
router.post('/filteremployees',filteredPaginateEmployees);

//add staff user
router.post('/addstaff',addStaffUser);

//update staffuser data
router.post('/updatestaff/:id',updateStaffUser);

//get staffs data department filter, start-end date and pagination options
router.post('/filterstaffs',filteredPaginateStaffs);

export default router;