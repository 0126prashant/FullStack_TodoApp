const mongoose = require("mongoose")

const AddTaskSchema = mongoose.Schema({
    title:String,
    status:Boolean
},
{
    versionKey: false,
 })

const AddTaskModel = mongoose.model("addTask",AddTaskSchema)

module.exports = {
    AddTaskModel
}