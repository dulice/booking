const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true},
    rating: { type: Number, default: 0},
    numReviews: { type: Number, default: 0},
    image: [{type: String}],
    avaliblePerson: {type: String, required: true},
    area: { type: Number, required: true},
    Book: { type: Boolean, default: false},
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        rating: { type: Number, default: 0},
        comment: { type: String, required: true}
    }]
}, { timestamps: true});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;