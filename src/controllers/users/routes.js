const express = require('express');
const router = express.Router();
const userRegister = require("./register.userController")
const validator = require("../../helpers/validator")
const loginUser = require('./login.userController');
const meUsers = require('./me.userController');
const { checkToken } = require('../../middleware/jwt');

router.post("/register", userRegister.validation, validator, userRegister.service);
router.post('/login', loginUser.service)
router.get('/me', checkToken, meUsers.service)


module.exports = router;