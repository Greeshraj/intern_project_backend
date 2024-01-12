const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded())
app.use(express.text());


const uri = process.env.ATLAS_URI ;
const options = {
    useNewUrlParser: true,
    //   useCreateIndex: true,
    useUnifiedTopology: true,
}

mongoose
    .connect(uri, options)
    .then(() => {
        console.log('MongoDB Connected')
    })
    .catch((err) => console.log(err))





const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const usersRouter = require('./routes/user');

app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/user', usersRouter);

app.use((error, req, res, next) => {
    console.log('Error', error)
    return res.status(error.statusCode).json({ message: error.message })
})
app.listen(port, (err) => {
    console.log(`Server is running on port: ${port}`);
    if (err) console.log(err)
})
