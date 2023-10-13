const user = require("../model/userModel");
const jwt = require('jsonwebtoken');
const { validationResult, check } = require('express-validator');

const postUserValidationRules = [
    check('emailAddress').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 5, max: 20 }).withMessage('Password must be 5-20 characters long'),
  ];


//============GET USERS FOR TEST============\\
const getUsers = async (req, res) => {

    console.log("GET ALL USERS FUNCTION TRIGGERED")

    try {
        res.json(await user.find());
    } catch {
        console.log({ message: error });
    }
}

//=============GET SPECIFIC USER=============\\
const getSpecificUser = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('Access Denied');

    try {

        console.log("GET SPECIFIC USER FUNCTION TRIGGERED")
        const verified = jwt.verify(token, process.env.JWTSecret);

        if (verified) {
            console.log("successfully verified!")
            console.log("Verified User:", verified);
            res.json(await user.findOne({ id: req.params._id }));
        } else {
            res.json({ message: "Expired session token" });
        }
        
    } catch {
        res.status(401).send('Invalid Token');
    }
}

//=================POST USER=================\\
const postUser = async (req, res) => {

    try {
        await Promise.all(postUserValidationRules.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log ("CREATE USER FUNCTION TRIGGERED")
        console.log ("request body: ", req.body)

        try {

            const newUser = new user({
                emailAddress: req.body.emailAddress,
                password: req.body.password,
                image: req.body.image,
            });

            const savedUser = await newUser.save();

            res.status(201).json(savedUser);

        } catch (error) {

            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    } catch (error) {
        res.status(500).json({message: 'Error creating user', error: error.message })
    }
}

//================DELETE USER================\\
const deleteUser = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split (" ")[1];

    if (!token) return res.status(401).send("Access Denied");

    try{
        console.log ("DELETE USER FUNCTION TRIGGERED")
        const verified = jwt.verify(token, process.env.JWTSecret);

        if (verified) {
            console.log("successfully verified!")
            console.log("Verified User:", verified);
            res.json(await user.deleteOne({id: req.params._id}));
            
        } else{
            res.json({ message: "Expired session token"})
        }

    } catch {
        res.status(401).send("Invalid Token");
    }
}

module.exports = {
    getUsers,
    getSpecificUser,
    postUser,
    deleteUser,
}