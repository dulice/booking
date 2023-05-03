const { isAuth } = require("../utlis");
const expressAsyncHandler = require("express-async-handler");
const router = require("express").Router();
const Book = require("../models/BookModel");
// const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

router.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const book = await new Book({
      bookRoom: {
        ...req.body.bookRoom,
        roomId: req.body.bookRoom._id,
      },
      user: req.user._id,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
      totalPrice: req.body.totalPrice,
      booked: true,
    });
    const saveBook = await book.save();
    res.status(200).json(saveBook);
  })
);

router.post(
  "/payment/create",
  expressAsyncHandler(async (req, res) => {
    const payment = await stripe.paymentIntents.create({
      amount: req.body.amount * 100,
      currency: "usd",
    });
    res.status(200).json({ clientSecret: payment.client_secret });
  })
);

router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const book = await Book.find();
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(500).json({ message: "Room not found!" });
    }
  })
);

router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(500).json({ message: "Room not found!" });
    }
  })
);

module.exports = router;
