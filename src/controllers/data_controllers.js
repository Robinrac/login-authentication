const user = require("../model/userModel");
const jwt = require('jsonwebtoken');

//=================GET USER=================\\
const getUsers = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWTSecret);

        if (verified == true) {
        res.json({ data: 'Secret data for user!' });
        } else {
        res.json({ message: "Not verified" });
        }
        
    } catch {
        res.status(401).send('Invalid Token');
    }
}

//=============GET SPECIFIC USER=============\\
const getSpecificUser = async (req, res) => {
    try{

    } catch (error) {
        console.log({ message: error });
    }
}

//=================POST USER=================\\
const postUser = async (req, res) => {
    try{

    } catch (error) {
        console.log({ message: error });
    }
}

//================DELETE USER================\\
const deleteUser = async (req, res) => {
    try{

    } catch (error) {
        console.log({ message: error });
    }
}

module.exports = {
    getUsers,
    getSpecificUser,
    postUser,
    deleteUser,
}