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
        const token = jwt.sign({username: user.username}, process.env.JWT_SECRET ?? "")
        res.json({
            message:"user signup success",
            token
        })
    }
    else{

        res.json({
            messgae:"Unable to signin"
        })
    }
})

router.get('/user', middleware, async (req, res) => {
    try {
        const user = await prismaClient.user.findFirst({
            where: {
                username: req.username, // Ensure username comes from middleware
            },
        });

        res.json({ user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/video', middleware, async(req,res)=>{
    const { url } = req.body;
    await prismaClient.video.create({
        data:{
            url,
            username: req.username
        }
    })

    res.json({
        message:"Video added"
    })
})

router.get('/videos', async(req,res)=>{
    const videos = await prismaClient.video.findMany()

    res.json({
        videos
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