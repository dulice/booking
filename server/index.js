const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoute = require('./routes/userRoute');
const roomRoute = require('./routes/roomRoute');
const bookRoute = require('./routes/BookRoute');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

dotenv.config();

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

app.use((err, req, res, next) => {
    res.status(500).json({message: err.message});
})