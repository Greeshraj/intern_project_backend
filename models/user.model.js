const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        // required: true,
        minlength: 6,
    },
    gender: {
        type: String,
        // required:true,
    }

});


const User = mongoose.model('User', userSchema);
module.exports = User;
