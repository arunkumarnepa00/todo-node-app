const mongoose= require('mongoose');
const router=require('express').Router();
// const router=require('router');


//controllers
const { createTodo,
        fetchTodos,
        updateTodo,
        deleteTodo,
        getTodo,
        searchTodos
    }
    =require('../controllers/maincontroller');


//routes
router.post('/todo',createTodo);
router.get('/todo',fetchTodos);
router.put('/todo/:id',updateTodo);
router.delete('/todo/:id',deleteTodo);
router.get('/todo/:id',getTodo)
router.get('/todo/search/:key',searchTodos);

//export
module.exports=router;