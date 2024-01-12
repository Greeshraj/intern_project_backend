
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {


    const email= req.body.email;
    const password = req.body.password;
    
    try {
        let firstuser = await User.findOne({ email: email });
        if (!firstuser) {
            return res.status(400).json({ message: "User not found" });
        }
        bcrypt
            .compare(password, firstuser.password)
            .then(async function (result) {
                console.log("user validated");

                if (result) {

                    const payLoad = {
                        email: firstuser.email,
                    };
                    const options = { expiresIn: 2147483647 };
                    console.log("Toekn ka kaam chalta hua")
                    const token = jwt.sign(payLoad,
                        process.env.JWT_KEYS,
                        options,
                        );
                    console.log("Token ka kaam khatam")
                    return res.status(200).send({
                    msg:"Login Authentication successful",
                    user: firstuser,
                    token: token,
                    })
                    ;
                    // jwt.sign(
                    //     payLoad,
                    //     process.env.JWT_KEY,
                    //     options,
                    //     (err, token) => {
                    //         if (err) res.status(404).json({ message: "Login failed at jwt" });
                    //         else {
                    //             return res.json({
                    //                 message: "Login Authentication successful",
                    //                 user: firstuser,
                    //                 token: token,
                    //             });
                    //         }
                    //     }
                    // );
                } else {
                    return res.status(404).json({ message: "Password not matched" });
                }

            })
            .catch((err) => { return res.status(400).json({ message: "Error: " + err }) }
            );




    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "some error occured" });
    }
};
