import staff_userModel from "../../../model/chit/staff_userModel.js";
import { generateToken } from "../../../utils/jwtToken.js";
import bcrypt from "bcrypt";

//adminLogin controller
export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // check the username exists
        const user = await staff_userModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // verify password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }
        //checks user is active or not
        if(user.active !== 1){
            return res.status(400).json({message:'User is deactivated'});
        }

        // generate a JWT token after user authentication
        const payload = {
            id_employee: user.id_employee,
            role:user?.role_id,
            branch:user?.access_branch
        };

        const token = generateToken(payload);
        const tokenName= `${user.role_id}_token`

        // Set the jwt token as a cookie
        res.cookie(tokenName, token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000,
            sameSite: "None",
        });

        // Return a success message
        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};