const user = require("../model/userModel");
const jwt = require('jsonwebtoken');

//============GET USERS FOR TEST============\\
const getUsers = async (req, res) => {
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
        const verified = jwt.verify(token, process.env.JWTSecret);

        if (verified == true) {
            res.json({ data: 'Secret data for user!' });
        } else {
            res.json({ message: "Not authorized to delete said user" }); //Vet ej om detta är korrekt error message
        }
        
    } catch {
        res.status(401).send('Invalid Token');
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
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split (" ")[1];

    if (!token) return res.status(401).send("Access Denied");

    try{
        const verified = jwt.verify(token, process.env.JWTSecret);

        if (verified == true) {

            

            res.json({ message : "User deleted successfully"});
        } else {
            res.json({ message: "Not authorized to delete said user"}) //Vet ej om detta är korrekt error message
        }

    } catch {
        res.status(401).send('Invalid Token');
    }
}

module.exports = {
    getUsers,
    getSpecificUser,
    postUser,
    deleteUser,
}