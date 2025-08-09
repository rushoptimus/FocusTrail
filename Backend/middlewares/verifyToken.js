import jsonwebtoken from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

    try{
        if (!token) {
            return res.status(401).json({success:false, message: "Unauthorized" });
        }
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.userID) {
            return res.status(401).json({success:false, message: "Unauthorized" });
        }
        req.userID = decoded.userID ;
         // Attach the user information to the request object
        next(); // Call the next middleware or route handler
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}