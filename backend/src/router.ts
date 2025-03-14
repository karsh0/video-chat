import { PrismaClient } from "@prisma/client";
import { Router } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import middleware from "./middleware";
const router = Router();
const prismaClient = new PrismaClient();
require('dotenv').config()  


router.post('/signup',async (req,res)=>{
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password,2);

    await prismaClient.user.create({
        data:{
            username,
            password:hashedPassword
        }
    })

    res.json({
        messgae:"user registered"
    })
})


router.post('/signin',async (req,res)=>{
    const {username, password} = req.body;
    const user = await prismaClient.user.findFirst({
        where:{
            username
        }
    })
    const passwordMatch = await bcrypt.compare(password, user?.password as string)

    if(user && passwordMatch){
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET ?? "")
        res.json({
            message:"user signup success",
            token
        })
    }
    res.json({
        messgae:"Unable to signin"
    })
})

router.post('/video', middleware, async(req,res)=>{
    const { url } = req.body;
    console.log(url)
    await prismaClient.video.create({
        data:{
            url,
            userId: req.userId
        }
    })

    res.json({
        message:"Video added"
    })
})

router.post('/upvote',async (req,res)=>{
    const {upvote, videoId} = req.body;

    await prismaClient.video.update({
        where:{
            id: videoId
        }, data:{
            upvote:{
                increment: 1
            }
        }
    })

    res.json({
        videoId,
        upvote
    })

})

export default router;