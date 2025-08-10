import express from "express";
import { login, logout, signup ,verifyEmail ,forgotPassword, resetPassword,checkAuth ,updateNameAndTitle} from "../controllers/auth.conroller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { updateProfileImage } from "../controllers/auth.conroller.js";

const router = express.Router();
router.get("/check-auth",verifyToken,checkAuth);


router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)

router.post("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword)

router.post("/reset-password/:token",resetPassword  )
router.put("/update-profile-image", verifyToken, updateProfileImage);
router.put("/update-name-title", verifyToken, updateNameAndTitle);
4 
export default router;