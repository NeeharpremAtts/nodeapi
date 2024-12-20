import express from 'express';
import { 
    userLogin,
    signupCustomer,
    verifyOtp,
    forgotPasswordInitial,
    resetPassword,
    editCustomerDetails
} from '../../../controller/chit/app/UserLoginController.js';

const router = express.Router();

//login route
router.post('/login',userLogin);

//curd routes

//customer signup
router.post('/usersignup',signupCustomer);

//verify otp
router.post('/verifyotp',verifyOtp);

//forgot password
router.post('/forgotpass',forgotPasswordInitial);

//verify password and otp
router.post('/resetpass',resetPassword);

//edit customer details
router.post('/edituserdetails/:id',editCustomerDetails);

export default router;