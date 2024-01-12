const router = require('express').Router();

const user_controller = require('../controllers/user_controller');
const auth = require('../middlewares/auth');
router.get('/login_check', user_controller.login_check);

module.exports = router;