const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    name: {
        type: String,
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    }
},{timestamps: true});

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true},
    rating: { type: Number, default: 0},
    numReviews: { type: Number, default: 0},
    image: [{type: String}],
    avaliblePerson: {type: String, required: true},
    area: { type: Number, required: true},
    reviews: [reviewSchema]
}, { timestamps: true});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;