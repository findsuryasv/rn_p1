const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/user');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/user', userRouter);

mongoose.connect('mongodb+srv://reactuser:reactuser@cluster0.78x1m.mongodb.net/test').then(() => {
    console.log('Connected to db')
}).catch((err) => console.log(err))

app.listen(3000, () => {
    console.log('Connected to port 3000');
})