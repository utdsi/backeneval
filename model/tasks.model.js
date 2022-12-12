

const mongoose = require("mongoose")

const taskssSchema = mongoose.Schema({
    taskname:String,
    status:String,
    tag:String,
    Userid:String
})

const TaskModel = mongoose.model("task",taskssSchema)

module.exports = {TaskModel}