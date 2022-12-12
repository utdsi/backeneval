

const mongoose = require("mongoose")

const usersSchema = mongoose.Schema({
    email:String,
    password:String,
})

const UserModel = mongoose.model("details",usersSchema)

module.exports = {UserModel}