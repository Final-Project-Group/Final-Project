const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: String,
    email: String,
    imageUrl: String,
    googleId: String,
    country: String,
    sports: Array,
    password: String
})

module.exports = model('User', userSchema);