

const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const  usersRouter = express.Router()

const {UserModel} = require("../model/users.model.js")
const { TaskModel } = require("../model/tasks.model.js")

usersRouter.get("/",(req,res)=>{

    res.send("done")
})

usersRouter.get("/todos",async(req,res)=>{

    const query = req.query.status

    const task = await TaskModel.find({"status":query})

    res.send(task)

})


usersRouter.post("/signup",async(req,res)=>{
    const {email,password} = req.body
    try {
        bcrypt.hash(password, 5, async function(err, hash) {
            // Store hash in your password DB.

            const user = new UserModel({email,password:hash})
            await user.save()
            res.send("signup successful")
        });
    } catch (error) {
        console.log(error)
    }

})
usersRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user  = await UserModel.find({email})

        if(user.length>0){
            const hash_password = user[0].password

            bcrypt.compare(password, hash_password, function(err, result) {
                // result == true
                if(result){
                    const token = jwt.sign({"Userid" : user[0]._id},"push")
                    res.send({"msg":"login succesfull","token":token})
                }else{
                    res.send("login failed")
                }
            });
        }else{
            res.send("login failed")
        }

    } catch (error) {
        console.log("errpor in login")
        console.log(error)
    }
})




module.exports = {usersRouter}