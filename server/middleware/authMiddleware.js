import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    // console.log('req: ', req.headers);
    const authHeader = req.headers["authorization"];
    if(!authHeader){
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({ success: false, message: "Invalid token format" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('decode: ', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
}