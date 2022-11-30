const mongoose=require('mongoose');

const todoSchema=mongoose.Schema({
    "title":String,
    "tasks":[String],
    "isImportant":Boolean
})

module.exports=mongoose.model('Todo',todoSchema);