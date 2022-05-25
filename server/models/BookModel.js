const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
    bookRoom: {
        name: {type: String, required: true},
        price: { type: String, required: true},
        avaliblePerson: { type: Number, required: true},
        area: { type: Number, required: true},
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Room"
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    fromDate: { type: Date, required: true},
    toDate: { type: Date, required: true},
    totalPrice: { type: Number, required: true},
    booked: { type: Boolean, default: false},
})

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;