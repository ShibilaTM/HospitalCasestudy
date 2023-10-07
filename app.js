
const express = require('express');
const app = new express();

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.json())

require('dotenv').config();



const fs = require('fs');



const routerFile = require('./route/Routes');
app.use('/api', routerFile);

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is listening on ${port}`);
})