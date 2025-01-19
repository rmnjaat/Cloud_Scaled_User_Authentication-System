const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter')
const ProductRoute = require('./Routes/ProductRoute')
require('dotenv').config();
require('./Models/db');


const PORT = process.env.PORT || 8080;

app.get('/ping' , (req , res)=>{
    res.send("PONG");
})

app.use(bodyParser.json()); 
app.use(cors()); //open to anyone
app.use('/auth' ,AuthRouter)
//making authenticated Api

app.use('/products' ,ProductRoute)



app.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT}`);
})