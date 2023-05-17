const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();


dotenv.config({path:'./config.env'});
require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());

app.use(require('./router/auth'));

const PORT = process.env.PORT;

const middleware = (req,res,next) => {
    console.log('hello middleware');
    next();
};
// app.get('/', (req, res) => {
//     res.send('hello home page');
// });
app.get('/login', middleware, (req, res) => {
    console.log('hello login');
    // res.cookie("TEST", 'helloo');
    res.send('hello login page');
});
app.listen(PORT, () => {
  console.log('server is running at port no '+PORT);  
})