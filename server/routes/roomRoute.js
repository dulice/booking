const router = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const Room = require('../models/RoomModel');
const { isAuth, isAdmin } = require('../utlis');

router.post('/', isAuth, isAdmin, expressAsyncHandler( async (req, res) => {
    const room = await new Room(req.body);
    const saveRoom = await room.save();
    res.status(200).json(saveRoom);
}));

router.get('/', expressAsyncHandler( async (req,res) => {
    const rooms = await Room.find();
    res.status(200).json(rooms);
}))

router.get('/:id', expressAsyncHandler(async (req, res) => {
    const room = await Room.findById(req.params.id);
    if(room) {
        res.status(200).json(room);
    } else {
        res.status(500).json({message: "room not found!"});
    }
}))

router.put('/:id', isAuth, isAdmin, expressAsyncHandler( async (req, res) => {
    const room = await Room.findById(req.params.id);
    if(room) {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new: true});
        res.status(200).json(updateRoom);
    } else {
        res.status(400).json('room not found!');
    }
}));

router.delete('/:id', isAuth, isAdmin, expressAsyncHandler( async (req, res) => {
    const room = await Room.findById(req.params.id);
    if(room) {
        await Room.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "delete Successfully!"});
    } else {
        res.status(400).json('room not found!');
    }
}));

router.post('/:id/review', isAuth, expressAsyncHandler (async (req, res) => {
    const room = await Room.findById(req.params.id);
    if(room) {
        const alreadyReview = room.reviews.find(r => r.user.toString() === req.user._id.toString());
        if(alreadyReview) return res.status(200).json("Already Review!");
        const review = {
            name: req.user.name,
            rating: req.body.rating,
            comment: req.body.comment,
            _id: user._id
        };
        room.reviews.push(review);
        room.numReviews = room.reviews.length;
        room.rating = room.reviews.reduce((sum, num) => sum + num.rating, 0) / room.reviews.length;
        await room.save();
        res.status(200).json(room);
    } else {
        res.status(500).json("Room not Found!");
    }
}));

module.exports = router;