const express = require("express")

const app = express()

require('dotenv').config()
const {connection} = require("./config/db.js")
const {usersRouter} =require("./routes/user.route.js")
const {taskRouter} = require("./routes/task.route.js")
const {auth} = require("./middleware/auth.js")

app.use(express.json())

app.get("/",(req,res)=>{
    res.send({"msg":"task done"})

})


app.use("/users",usersRouter)
app.use(auth)
app.use("/task",taskRouter)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to db succesfully")
    } catch (error) {
        console.log("connection to db failed")
        console.log(error)
    }
    console.log(`listening on port ${process.env.port}`)
})