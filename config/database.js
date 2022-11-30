const mongoose = require('mongoose');
require('dotenv').config();

const dbconnection=()=>{
    mongoose.connect(process.env.DBConnect,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(console.log('connected to Mongo Database'))
      .catch((err)=>console.log(`error ocuured in DB connection: ${err}`))
}

module.exports=dbconnection;