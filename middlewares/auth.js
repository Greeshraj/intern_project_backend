const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
    try {

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (decoded) {
            req.user = await User.findOne({ email: decoded.email });
            next();
        } else {
            return res.status(407).json({
                message: "Unauthorised",
            });
        }
    } catch (error) {
        return res.status(412).json({

            message: "some error occured",
        });
    }
};
