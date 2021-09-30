const express = require("express");
const router = express.Router();
const UserController = require('./controller');
const auth = require('../../../middleware/auth')

router.post('/register', UserController.createUser)
router.post('/login', UserController.login)
router.get('/', auth.auth, UserController.getUserById)

module.exports = router;