const express = require('express');
const router = express.Router();
const userControllers = require("../controllers/usercontrollers")

router.get('/', userControllers.getUsers);
router.get('/:id', userControllers.getSpecificUser);
router.post('/', userControllers.postUser);
router.delete('/:id', userControllers.deleteUser);


module.exports = router;