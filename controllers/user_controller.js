const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.login_check = async (req, res) => {

    try {
        const token = req.headers.authorization.split(" ")[1];

        let decoded = "";
        try {
            decoded = await jwt.verify(token, process.env.JWT_KEYS);
        } catch (err) {
            return res.status(403).json({
                message: "login failed at jwt at login_check",
            });
        }
        if (decoded) {
            // console.log(decoded);
            const user = await User.findOne({ email: decoded.email });
            return res.status(200).json({
                message: "login check successful",
                user: user,
            });
        } else {
            return res.status(403).json({
                message: "login check failed",
            });
        }
    } catch (error) {
        return res.status(412).json({
            message: "some error occured " + error,
        });
    }

}

