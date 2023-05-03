const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const userRoute = require('./routes/userRoute');
const roomRoute = require('./routes/roomRoute');
const bookRoute = require('./routes/BookRoute');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const port = process.env.PORT || 5000
mongoose.connect(process.env.CONNECT_DB)
    .then(() => {
        app.listen(port);
        console.log('connect to db');
    })
    .catch(err => {
        console.log(err.message);
    });

app.use('/api/rooms', roomRoute);
app.use('/api/users', userRoute);
app.use('/api/books', bookRoute);

const __variableOfChoice = path.resolve()
app.use(express.static(path.join(__variableOfChoice, '/client/build')));
app.get("*", (req,res) => {
    res.sendFile(path.join(__variableOfChoice, '/client/build/index.html'));
})

app.use((err, req, res, next) => {
    res.status(500).json({message: err.message});
})