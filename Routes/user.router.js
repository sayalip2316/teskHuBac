const express=require("express");
const userRouter=express.Router();
const {UserModel}=require("../Model/user.model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

userRouter.get("/",async(req,res)=>{
    try {
        const data=await UserModel.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

userRouter.get("/user/:id",async(req,res)=>{
    const {id}=req.params;
    try {
        const data=await UserModel.findById(id)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

userRouter.post("/register",async(req,res)=>{
    const{name,email, password,role,profilePicture}=req.body;
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(500).send("Something went wrong")
            }
            if(hash){
                const user=new UserModel({name,email, password:hash,role,profilePicture});
                await user.save();
                res.status(201).send({"msg":"Registration successfull"})
            }
        });
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }  
})

userRouter.post("/login",async(req,res)=>{
    const {email, password}=req.body;
    try {
        const user=await UserModel.findOne({email})
        console.log(user)
        if(user){
            bcrypt.compare(password,user.password,async(err,result)=>{
                if(result){
                    res.status(200).send({ msg: "Login Successfull", "token": jwt.sign({ userID: user._id}, "masai"),user});
                }else{
                    res.status(400).send("Wrong credentials!")
                }
            })
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

userRouter.get("/projectManagers",async(req,res)=>{
    try {
        const data=await UserModel.find({role:"Project Manager"})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

userRouter.get("/teammembers",async(req,res)=>{
    try {
        const data=await UserModel.find({role:"Team Member"})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
module.exports={userRouter};