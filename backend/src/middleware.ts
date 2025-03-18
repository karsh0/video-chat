import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export default function middleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: "Token not found" });
        return;
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET ?? "") as JwtPayload;
        
        if (verified.id) {
            req.userId = verified.id; 
            next();
            return;
        }
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }

    res.status(403).json({ message: "Authorization failed" });
}
