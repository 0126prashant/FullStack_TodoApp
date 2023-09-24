const express  = require("express")
const { connection } = require("./db")
const cors = require("cors")
const { todo } = require("./routes/todo.routes")
const app = express()
app.use(express.json())
app.use(cors())
app.use("/",todo)
require("dotenv").config()

app.listen(8080,async()=>{
    try {
        await connection;
        console.log(`PORT is running at ${process.env.Port}`)
        console.log("Connected to db");
    } catch (error) {
        console.log(error)
    }
})



