const { isAuth } = require('../utlis');
const expressAsyncHandler = require('express-async-handler');
const router = require('express').Router();
const Book = require('../models/BookModel');

router.post('/', isAuth, expressAsyncHandler (async (req, res) => {
    const book = await new Book ({
        bookRoom: {
            ...req.body.bookRoom,
            roomId: req.body.bookRoom._id,
        },
        user: req.user._id,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        totalPrice: req.body.totalPrice,
        booked: true
    });
    const saveBook = await book.save();
    res.status(200).json(saveBook);
}));

router.get('/', expressAsyncHandler (async (req, res) => {
    const book = await Book.find();
    if(book) {
        res.status(200).json(book);
    } else {
        res.status(500).json({message: "Room not found!"});
    }
}))

router.get('/:id', expressAsyncHandler (async (req, res) => {
    const book = await Book.findById(req.params.id);
    if(book) {
        res.status(200).json(book);
    } else {
        res.status(500).json({message: "Room not found!"});
    }
}))

module.exports = router;