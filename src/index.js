const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const aws = require('aws-sdk')
const route = require('./route')
const app = express();
app.use(express.json())
app.use(multer().any());

mongoose.connect('mongodb+srv://AkshayMakwana:Akshay123@cluster0.zmta9.mongodb.net/Assignment-4-DB?retryWrites=true&w=majority',
{
    useNewUrlParser: true
})

.then(()=>{ console.log('mongodb is connected') })

.catch((err)=>{ console.log(err) })

app.use('/', route)

app.listen(3000,()=>{ console.log('server start') });


