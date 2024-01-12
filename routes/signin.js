const router = require('express').Router();
const User = require('../models/user.model');
const signin_controller = require('../controllers/signin_controller');
router.post('/', signin_controller.login);
module.exports = router;