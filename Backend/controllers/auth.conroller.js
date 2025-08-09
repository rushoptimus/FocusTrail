import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import dotenv from "dotenv";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
import { sendResetPasswordEmail } from "../utils/sendResetPasswordEmail.js";
import { ResetSuccessMail } from "../utils/sendResetSuccessMail.js";
import { sendWelcomeEmail } from "../utils/sendWelcomeEmail.js";


export const signup = async (req, res) => {
    const { email, password, name , Title } = req.body;
    try {
        if (!email || !password || !name || Title) {
            throw new Error("All fields are required")
        }
        const UserAlreadyExist = await User.findOne({ email });
        if (UserAlreadyExist) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
        const user = new User({
            email,
            password: hashedPassword,
            name,
            Title,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })
        await user.save();
        await sendVerificationEmail(email, verificationToken);

        generateTokenAndSetCookie(res, user._id)
        res.status(201).json({
            success: true, message: "User created Succesfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

export const verifyEmail = async (req, res) => {
    const {code} = req.body;
    try{
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" })
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({ message: "Email verified and welcome email sent." });

    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}


export const login = async (req, res) => {
   const{email, password} = req.body;
   try{
         if(!email || !password){
              throw new Error("All fields are required")
         }
         const user = await User.findOne({ email });
         if (!user) {
             return res.status(400).json({ success: false, message: "User does not exist" })
         }
         const isPasswordCorrect = await bcrypt.compare(password, user.password);
         if (!isPasswordCorrect) {
             return res.status(400).json({ success: false, message: "Invalid credentials" })
         }
         generateTokenAndSetCookie(res, user._id);
         user.lastlogin = new Date();  
         await user.save();

         res.status(200).json({
             success: true, message: "User logged in successfully",
             user: {
                 ...user._doc,
                 password: undefined,
             },
         });
   }
   catch (error) {
       return res.status(400).json({ success: false, message: error.message })
   }
}

export const logout = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ success: true, message: "Logged out successfully" });
}

export const forgotPassword = async (req, res) => {
    const {email} = req.body;
    try{
        if (!email){
            throw new Error("Email is required")
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" })
        }
        const resetPasswordToken = crypto.randomBytes(20).toString('hex');
        const resetPasswordExpiresAt = Date.now() + 1* 60 * 60 * 1000; // 24 hours
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpiresAt = resetPasswordExpiresAt;

        await user.save();
        await sendResetPasswordEmail(email, `${process.env.client_URL}/reset-password/${resetPasswordToken}`);
        res.status(200).json({ success: true, message: "Reset password email sent." });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}
export const resetPassword = async (req, res) => {
    try{
        const {token} = req.params;
        const {password} = req.body;
        if (!token || !password) {
            throw new Error("Token and password are required")
        }
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset password token" })
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await ResetSuccessMail(user.email, "Your password has been reset successfully.");
        res.status(200).json({ success: true, message: "Password reset successfully" });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userID).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }   
        res.status(200).json({success: true,user});
    }
        catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }


    // In `auth.controller.js` — add this new controller
export const updateProfileImage = async (req, res) => {
    try {
        const { imageUrl } = req.body;
        const userId = req.userID; // from verifyToken middleware

        if (!imageUrl) {
            return res.status(400).json({ success: false, message: "Image URL is required" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { image: imageUrl },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "Profile image updated", user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
