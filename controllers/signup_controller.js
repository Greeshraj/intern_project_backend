const User = require("../models/user.model");
const bcrypt = require('bcrypt');


exports.signup = async (req, res) => {

    try {

        let user = await User.findOne({ email: req.body.email });
        if (user != null) {
            return res.status(400).json({ "message": "This email is already linked with an account." });
        }
        
        const { first_name, last_name, email, password, gender } = req?.body;

        const newUser = new User({ first_name, last_name, email, gender: gender?.toUpperCase()});
        const saltRounds = 10;

        bcrypt
            .hash(req.body.password, saltRounds)
            .then((hash) => {
                newUser.password = hash;
                newUser
                    .save()
                    .then(() => {
                        return res.status(200).json({
                            message: "User registered successfully",
                        });
                    })
                    .catch((err) => { return res.status(400).json("Error2: " + err) });
            })
            .catch((err) => res.status(400).json("Error3: " + err));
    } catch (err) {
        return res.status(400).json("Error4: " + err);
    }
};
