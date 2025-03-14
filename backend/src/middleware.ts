import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export default function middleware(req:Request, res:Response, next:NextFunction){
    const token = req.headers['token'];
    if(!token){
        console.log("token not found")
        return;
    }
    const verified = jwt.verify(token as string, process.env.JWT_SECRET ?? "")
    console.log(verified)
    if((verified as JwtPayload).id){
        req.userId = (verified as JwtPayload).id;
        return next();
    }
    res.json({
        message:"Authorization failed"
    })
}