const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    done:{
        type: Boolean,
        require: true
    },
    doneBy:{
        type: String,
        required: false
    }
})


const TaskModel = mongoose.model('HomeTasks', TaskSchema)
module.exports = TaskModel;