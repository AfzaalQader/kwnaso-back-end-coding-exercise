const express = require("express");
const router = express.Router();
const UserController = require('./controller');
// const auth = require('../../../middleware/auth')

router.post('/create-task', UserController.createTask)
router.get('/list-task', UserController.listTask)

module.exports = router;