const express = require("express");
const router = express.Router();
const UserController = require('./controller');
const auth = require('../../../middleware/auth')

router.post('/create-task', auth.auth, UserController.createTask)
router.get('/list-task', auth.auth, UserController.listTask)

module.exports = router;