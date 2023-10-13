const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res) => {
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
});

//skelett för post request
router.post('/', (req, res) => {
  
  try {

  } catch {
    res.status(401).send("Fel") //Måste lägga till felmeddelande här men vet ej vad för tillfället
  }

  res.json({ message: 'New user successfully created' });
});

//skelett för delete request
router.delete('/', (req, res) => {
  
  try {

  } catch {
    res.status(401).send("Fel") //Måste lägga till felmeddelande här men vet ej vad för tillfället
  }

  res.json({ message: 'User successfully deleted' });
});


module.exports = router;