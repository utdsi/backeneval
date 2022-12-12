
const express = require("express")

const app = express()

const taskRouter = express.Router()

const {TaskModel} = require("../model/tasks.model.js")


taskRouter.get("/",async(req,res)=>{

    const task = await TaskModel.find()
    
    res.send(task)
})

taskRouter.post("/create",async(req,res)=>{
    const payload = req.body

    const new_task = new TaskModel(payload)
    await new_task.save()
    res.send("task crrated successfully")

})

taskRouter.patch("/edit/:taskID",async(req,res)=>{

    const payload = req.body
    const taskID = req.params.taskID
    const Userid = req.body.Userid

    const task = await TaskModel.findOne({_id:taskID})

    if(Userid == task.Userid){
        await TaskModel.findByIdAndUpdate({_id:taskID},payload)
        res.send("task updated successfully")
    }else{
        res.send("not authorised")
    }

    

})


taskRouter.delete("/delete/:taskID",async(req,res)=>{
    
    const taskID = req.params.taskID

    const task = await TaskModel.findOne({_id:taskID})

    if(taskID == task.Userid){
        await TaskModel.findByIdAndDelete({_id:taskID})
        res.send("task deleted successfully")
    }else{
        res.send("not authorised")
    }

})




module.exports = {taskRouter}