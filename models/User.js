const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    password: String,
    googleId: String
});

mongoose.model('users', userSchema);