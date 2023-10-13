const express = require('express');
const router = express.Router();
const userControllers = require("../controllers/data_controllers")

router.get('/', userControllers.getUsers);
router.get('/:id', userControllers.getSpecificUser);
router.post('/', userControllers.getUsers);
router.delete('/:id', userControllers.getUsers);


module.exports = router;