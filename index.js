require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');

//DB Connection
const dbconnection=require('./config/database')
dbconnection();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

//Routes
const routes=require('./routes/routes');
app.use('/api/v1',routes);

//App Listener
app.listen(process.env.PORT || 5000,()=>{
    console.log("Backend server is running on port 5000");
})

