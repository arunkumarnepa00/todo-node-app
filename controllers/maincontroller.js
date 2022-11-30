const Todo = require("../models/todoSchema");

//create todo
const createTodo = async (req, res) => {
  const { title, tasks, isImportant } = req.body;
  // console.log(req.body)
  if (!title || tasks.length<0) {
    return res.status(400).json({ err: "Both title and task are required" });
  } 
  else {
    const details = req.body;
    const item = new Todo(details);
    await item
      .save()
      .then((result) => res.status(200).json({ result }))
      .catch((err) => res.status(400).json({ err: `${err}` }));
  }
};

//fetch todos
const fetchTodos = async (req, res) => {
  await Todo.find().sort([['isImportant','desc']])
    .then((items) => {
      return res.status(200).json({ items });
    })
    .catch((err) => {
      return res.status(400).json({ err: `${err}` });
    });
};

//update todos
const updateTodo = async (req, res) => {
  const id = req.params.id;

  const isExist = await Todo.findById(id).exec();
  if (!isExist) {
    return res.status(400).json({ err: `Record do not exist` });
  }

  await Todo.findByIdAndUpdate(id, req.body, {
    new: true,
  })
    .then((item) => {
      return res.status(200).json({ item });
    })
    .catch((err) => {
      return res.status(400).json({ err: `${err}` });
    });
};

//delete todos
const deleteTodo = async (req, res) => {
  const id = req.params.id;
  const isExist = await Todo.findById(id).exec();
  if (!isExist) {
    return res.status(400).json({ err: `Record do not exist` });
  }

  await Todo.findByIdAndDelete(id)
    .then((item) => {
      return res.status(200).json({ msg: `${item._id} is deleted` });
    })
    .catch((err) => {
      return res.status(400).json({ err: `${err}` });
    });
};

//get todo by id
const getTodo=async (req,res)=>{
  await Todo.findById(req.params.id)
  .then((item) => {
    return res.status(200).json({ item});
  })
  .catch((err) => {
    return res.status(400).json({ err: `${err}` });
  });
}

//get todo by search key
const searchTodos=async(req,res)=>{
  await Todo.find({
    $or:[
      {title:req.params.key},
      {tasks:{$in:[req.params.key]}}
    ]
  }).sort([['isImportant','desc']])
  .then((items) => {
    return res.status(200).json({items});
  })
  .catch((err) => {
    return res.status(400).json({ err: `${err}` });
  });
}

module.exports = { createTodo, fetchTodos, updateTodo, deleteTodo, getTodo,searchTodos};
