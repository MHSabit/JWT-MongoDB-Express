const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');


// internal requirement
const todoHandaler = require('./Routes/todoRoute');
const userHandaler = require('./Routes/User');
const connectDB = require('./server');
const CheckLogin = require('./Middleware/CheckLogin');
const ISActive = require('./Middleware/IsActive');


const app = express();
connectDB();
env.config();
app.use(express.json());

//variable
const port = 3000;


app.get('/', (req, res)=>{
    res.send('Application is running test get end point');
});

app.use('/todo', CheckLogin, ISActive, todoHandaler);
app.use('/user', userHandaler);


app.listen(port, ()=>{
    console.log(`Server is running on port number ---> ${port}`)
})