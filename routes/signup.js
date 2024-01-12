const router = require('express').Router();
const signup_controller = require('../controllers/signup_controller');
router.post('/', signup_controller.signup);

module.exports = router;