const router = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generateToken, isAuth } = require('../utlis');

router.post('/signup', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    if(user) return res.status(400).json("User already exist!");
    const newUser = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    await newUser.save();
    res.status(200).json(newUser);
}));

router.post('/signin', expressAsyncHandler (async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).json({message: "User doesn't exist!"});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).json("Incorrect Password");

    res.status(200).json({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user)
    });
}));

router.put('/profile', isAuth, expressAsyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashPassword;
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        const updateUser = await user.save();
        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser)
        })
    } else {
        res.status(400).json({message: "User not Found!"});
    }
}))

module.exports = router;