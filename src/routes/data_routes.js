const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  //Om token inte finns, skicka status 402 "access denied"
  if (!token) return res.status(401).send('Access Denied');

    //Om token finns, kör try, catch och kolla privilages på användaren genom token i form av roll
  try {
    const verified = jwt.verify(token, 'secretKey');

    //Se om user har admin role privilages eller inte
    if (verified.role === 'admin') {
      res.json({ data: 'Secret data for admin!' });
    } else {
      res.json({ data: 'Secret data for user!' });
    }

  } catch {
    res.status(401).send('Invalid Token');
  }
});

module.exports = router;