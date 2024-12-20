import Customer from "../../../model/chit/customerModel.js";
import { generateToken } from "../../../utils/jwtToken.js";
import dotenv from 'dotenv';
dotenv.config()
import axios from 'axios'
import otpModel from "../../../model/chit/otpModel.js";
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import mongoose from "mongoose";


export const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // check the email exists
        const user = await Customer.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.active !== 1) {
            return res.status(401).json({ message: 'User is inactive' })
        }

        // verify password
        const validPassword = bcrypt.compare(password, user.passwd);

        if (!validPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // generates a token after user authentication
        const payload = {
            id_employee: user._id,
            role: 'customer'
        };

        const token = generateToken(payload);

        // Set the jwt token as a cookie
        res.cookie("user_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000,
            sameSite: "Strict",
        });

        // Return a success message
        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//generate otp PIN / 4 digit
const generatePIN = () => {
    const pin = crypto.randomInt(1000, 10000).toString();
    return pin;
};

//sentOTP
const sendOTP = async (mobile, otp) => {
    try {
        console.log(mobile, otp)
        const url = process.env.OTP_SIGNUP;
        const messageText = `phone=${mobile}&text=Dear Customer, Your login OTP for the BK JEWELS App is ${otp}. Please do not share the code with anyone. This OTP is valid for next 30 minutes.-ATTS&priority=ndnd&stype=normal`;

        const response = await axios.get(`${url}${messageText}`)

        if (response && response.status === 200) {

            console.log('OTP sent successfully:', response.data);
        } else {
            console.log('Failed to send OTP:', response);
            throw new Error('OTP failed to send');
        }
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
};

export const signupCustomer = async (req, res) => {
    try {
        const jsonData = req.body;

        const requiredFields = {
            firstname: 'First Name',
            lastname: 'Last Name',
            mobile: 'Mobile',
            passwd: 'Password',
            id_branch: 'Branch'
        };

        for (const [field, label] of Object.entries(requiredFields)) {
            if (!jsonData[field] || typeof jsonData[field] === 'string' && jsonData[field].trim() === '') {
                return res.status(400).json({ status: 'failed', message: `${label} is required` });
            }
        }

        // Check if mobile number exists
        const existingUser = await Customer.findOne({
            mobile: jsonData.mobile,
            id_branch: jsonData.id_branch
        });

        if (existingUser) {
            return res.status(400).json({
                status: 'failed',
                message: 'Mobile Number Already Exists'
            });
        }

        // customer data with required fields
        const cusData = {
            firstname: String(jsonData.firstname).trim().toUpperCase(),
            lastname: String(jsonData.lastname).trim().toUpperCase(),
            id_branch: jsonData.id_branch.trim(),
            mobile: String(jsonData.mobile).trim(),
            username: String(jsonData.mobile).trim(),
            passwd: await bcrypt.hash(String(jsonData.passwd).trim(), 12),
            date_add: new Date(),
            // Set defaults values for required fields to avoid error
            gender: jsonData.gender || 0,
            id_country: jsonData.id_country || null,
            id_state: jsonData.id_state || null,
            pincode: jsonData.pincode || 0,
            added_by: jsonData.added_by || 0,
            notifyemail: typeof jsonData.notifyemail === 'number' ? jsonData.notifyemail : 1,
            notifysms: typeof jsonData.notifysms === 'number' ? jsonData.notifysms : 1
        };

        // Optional fields - only add if they exist and are not empty
        const optionalFields = {
            deviceid: str => str.trim(),
            date_of_birth: val => val,
            phone: str => str.trim(),
            address: str => str.trim(),
            email: str => str.trim(),
            whatsapp: str => str.trim(),
            id_city: val => val,
            nominee_name: str => str.trim(),
            nominee_relationship: str => str.trim(),
            nominee_mobile: str => str.trim(),
            bank_accountname: str => str.trim(),
            bank_accno: str => str.trim(),
            bank_ifsccode: str => str.trim(),
            bank_branchname: str => str.trim()
        };

        // Process optional fields
        for (const [field, processor] of Object.entries(optionalFields)) {
            if (jsonData[field] &&
                (typeof jsonData[field] !== 'string' || jsonData[field].trim() !== '')) {
                cusData[field] = processor(jsonData[field]);
            }
        }

        // Create and save customer
        const newCustomer = new Customer(cusData);
        const customerData = await newCustomer.save();

        if (customerData) {
            const otp = generatePIN();
            try {
                await sendOTP(jsonData.mobile, otp);

                const otpData = {
                    username: jsonData.mobile,
                    send_otptime: new Date().toISOString(),
                    otp_code: otp,
                    type: 1
                };

                const newotpData = new otpModel(otpData);
                await newotpData.save();

                return res.status(201).json({
                    status: 'success',
                    message: 'Account created successfully'
                });
            } catch (error) {
                console.error('OTP Error:', error);
                return res.status(500).json({
                    status: 'failed',
                    message: 'Account created but failed to send OTP'
                });
            }
        } else {
            return res.status(500).json({
                status: 'failed',
                message: 'Failed to create account'
            });
        }
    } catch (error) {
        console.error('Signup Error:', error);
        return res.status(500).json({

            message: error.message || 'Internal Server Error'
        });
    }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
    try {
        const { username, otp } = req.body;

        if (!username) {
            return res.status(401).json({ message: 'Username is missing' });
        }

        if (!otp) {
            return res.status(401).json({ message: 'OTP is missing' });
        }

        // Find the OTP data
        const userData = await otpModel.findOne({ username: username, otp_code: otp });

        // If no matching OTP record is found
        if (!userData) {
            return res.status(400).json({ message: 'Invalid OTP or username' });
        }

        // Checking if the OTP is already verified
        if (userData.is_verified === 1) {
            return res.status(400).json({ message: 'OTP has already been verified' });
        }

        // checking OTP expired or not
        const otpExpiryTime = 30 * 60 * 1000;
        const currentTime = new Date().getTime();
        const otpTime = new Date(userData.send_otptime).getTime();

        if (currentTime - otpTime > otpExpiryTime) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // Mark OTP as verified
        const updateFields = {
            is_verified: 1,
            verified_time: new Date().toISOString()
        };

        // Update the document with new 
        await otpModel.updateOne(
            { username: userData.username, otp_code: userData.otp_code },
            { $set: updateFields }
        );

        // Return response
        return res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// forgot password step 1
export const forgotPasswordInitial = async (req, res) => {
    try {
        const { mobile } = req.body;

        if (!mobile || typeof mobile !== 'string' || mobile.trim() === '') {
            return res.status(400).json({
                status: 'failed',
                message: 'Mobile number is required'
            });
        }

        // Check if user exists
        const user = await Customer.findOne({ mobile: mobile.trim() });
        if (!user) {
            return res.status(404).json({
                status: 'failed',
                message: 'No account found with this mobile number'
            });
        }

        if (user.active !== 1) {
            return res.status(401).json({
                status: 'failed',
                message: 'Account is inactive'
            });
        }

        // Generate OTP
        const otp = generatePIN()

        try {
            // Send OTP
            await sendOTP(mobile, otp);

            // Save OTP record
            const otpData = {
                username: mobile,
                send_otptime: new Date().toISOString(),
                otp_code: otp,
                type: 2
            };

            const newOtpData = new otpModel(otpData);
            await newOtpData.save();

            return res.status(200).json({
                status: 'success',
                message: 'Password reset OTP sent successfully'
            });

        } catch (error) {
            console.error('OTP Error:', error);
            return res.status(500).json({
                status: 'failed',
                message: 'Failed to send reset password OTP'
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Reset password step 2
export const resetPassword = async (req, res) => {
    try {
        const { mobile, otp, newPassword, confirmPassword } = req.body;
        console.log(req.body)

        // Input validation
        if (!mobile || !otp || !newPassword || !confirmPassword) {
            return res.status(400).json({
                status: 'failed',
                message: 'All fields are required'
            });
        }

        // Password validation
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                status: 'failed',
                message: 'Passwords do not match'
            });
        }

        // Password strength validation
        if (newPassword.length < 8) {
            return res.status(400).json({
                status: 'failed',
                message: 'Password must be at least 8 characters long'
            });
        }

        // Verify OTP
        const otpRecord = await otpModel.findOne({
            username: mobile,
            otp_code: otp,
            type: 2,
            is_verified: 0
        });

        if (!otpRecord) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid or expired OTP'
            });
        }

        // Checks otp expired or not
        const otpExpiryTime = 30 * 60 * 1000;
        const currentTime = new Date().getTime();
        const otpTime = new Date(otpRecord.send_otptime).getTime();

        if (currentTime - otpTime > otpExpiryTime) {
            return res.status(400).json({
                status: 'failed',
                message: 'OTP has expired'
            });
        }

        // Find user
        const user = await Customer.findOne({ mobile });
        if (!user) {
            return res.status(404).json({
                status: 'failed',
                message: 'User not found'
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Update password
        await Customer.updateOne(
            { mobile },
            {
                $set: {
                    passwd: hashedPassword,
                    date_upd: new Date()
                }
            }
        );

        // Mark OTP as verified
        await otpModel.updateOne(
            { _id: otpRecord._id },
            {
                $set: {
                    is_verified: 1,
                    verified_time: new Date().toISOString()
                }
            }
        );

        return res.status(200).json({
            status: 'success',
            message: 'Password reset successful'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

//edit customer data
export const editCustomerDetails = async (req, res) => {
    try {
        const customerId = req.params.id;
        const updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid customer ID format'
            });
        }

        const existingCustomer = await Customer.findById(customerId);
        if (!existingCustomer) {
            return res.status(404).json({
                status: 'failed',
                message: 'Customer not found'
            });
        }

        const sanitizedUpdates = {};
        const errors = [];

        const isValidDate = (dateString) => {
            const date = new Date(dateString);
            return date instanceof Date && !isNaN(date);
        };

        const isValidMobile = (mobile) => {
            return /^\d{10}$/.test(mobile);
        };

        const isValidEmail = (email) => {
            return /^\S+@\S+\.\S+$/.test(email);
        };

        for (const [key, value] of Object.entries(updates)) {
            if (value === undefined || value === null) continue;

            switch (key) {
                case 'email':
                    if (value && !isValidEmail(value)) {
                        errors.push('Invalid email format');
                    } else if (value) {
                        sanitizedUpdates.email = value.toLowerCase().trim();
                    }
                    break;

                case 'mobile':
                case 'whatsapp':
                    if (value && !isValidMobile(value)) {
                        errors.push(`Invalid ${key} number format`);
                    } else if (value) {
                        sanitizedUpdates[key] = value.trim();
                    }
                    break;

                case 'date_of_birth':
                case 'date_of_wed':
                    if (value && !isValidDate(value)) {
                        errors.push(`Invalid ${key} format`);
                    } else if (value) {
                        sanitizedUpdates[key] = new Date(value);
                    }
                    break;

                case 'pincode':
                    if (value && (!Number.isInteger(value) || value.toString().length !== 6)) {
                        errors.push('Invalid pincode format');
                    } else if (value) {
                        sanitizedUpdates.pincode = value;
                    }
                    break;

                case 'id_branch':
                case 'id_city':
                case 'id_state':
                case 'id_country':
                    if (value && !mongoose.Types.ObjectId.isValid(value)) {
                        errors.push(`Invalid ${key} format`);
                    } else if (value) {
                        sanitizedUpdates[key] = value;
                    }
                    break;

                case 'gender':
                    if (value !== undefined && ![0, 1, 2].includes(Number(value))) {
                        errors.push('Invalid gender value');
                    } else {
                        sanitizedUpdates.gender = Number(value);
                    }
                    break;

                case 'active':
                    if (value !== undefined && ![0, 1].includes(Number(value))) {
                        errors.push('Invalid active status');
                    } else {
                        sanitizedUpdates.active = Number(value);
                    }
                    break;

                case 'is_new':
                    if (value && !['Y', 'N'].includes(value)) {
                        errors.push('Invalid is_new value');
                    } else if (value) {
                        sanitizedUpdates.is_new = value;
                    }
                    break;

                case 'added_by':
                    if (value !== undefined && ![0, 1, 2].includes(Number(value))) {
                        errors.push('Invalid added_by value');
                    } else {
                        sanitizedUpdates.added_by = Number(value);
                    }
                    break;

                case 'notifyemail':
                case 'notifysms':
                case 'notification':
                    if (value !== undefined && ![0, 1].includes(Number(value))) {
                        errors.push(`Invalid ${key} value`);
                    } else {
                        sanitizedUpdates[key] = Number(value);
                    }
                    break;

                case 'firstname':
                case 'lastname':
                    if (value) {
                        sanitizedUpdates[key] = value.trim().toUpperCase();
                    }
                    break;

                case 'deviceid':
                case 'subscription_id':
                case 'iossubscription_id':
                case 'reference_no':
                case 'phone':
                case 'address':
                case 'nominee_name':
                case 'nominee_relationship':
                case 'nominee_mobile':
                case 'cus_img':
                case 'id_proof':
                case 'digital_sign':
                case 'pan':
                case 'authorno':
                case 'username':
                case 'bank_accountname':
                case 'bank_accno':
                case 'bank_ifsccode':
                case 'bank_branchname':
                    if (value) {
                        sanitizedUpdates[key] = value.trim();
                    }
                    break;

                default:
                    break;
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({
                status: 'failed',
                message: 'Validation failed',
                errors: errors
            });
        }

        if (sanitizedUpdates.mobile && sanitizedUpdates.mobile !== existingCustomer.mobile) {
            const mobileExists = await Customer.findOne({
                mobile: sanitizedUpdates.mobile,
                _id: { $ne: customerId }
            });

            if (mobileExists) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Mobile number is already in use'
                });
            }
        }

        if (sanitizedUpdates.email && sanitizedUpdates.email !== existingCustomer.email) {
            const emailExists = await Customer.findOne({
                email: sanitizedUpdates.email,
                _id: { $ne: customerId }
            });

            if (emailExists) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Email is already in use'
                });
            }
        }

        sanitizedUpdates.date_upd = new Date();

        const updatedCustomer = await Customer.findByIdAndUpdate(
            customerId,
            { $set: sanitizedUpdates },
            { 
                new: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            status: 'success',
            message: 'Customer details updated successfully',
            data: updatedCustomer
        });

    } catch (error) {
        console.error('Update Customer Error:', error);
        return res.status(500).json({
            status: 'failed',
            message: error.message || 'Internal server error'
        });
    }
};
