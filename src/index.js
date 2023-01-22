const express = require('express');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const app = express();
const multer=require("multer")
const PORT = process.env.PORT || 3001

app.use(express.json());

app.use(multer().any())


mongoose.connect("mongodb+srv://panigrahisameer_200:iklsSoxrtvpy4JOK@cluster0.kyd9m93.mongodb.net/BookManagement", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"), err => console.log(err))

app.use('/', route);


app.listen(PORT, function () {
    console.log('Express app running on port ' + PORT)
});
