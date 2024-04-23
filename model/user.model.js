const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {type:String, required : true},
    email: {type:String, required: true, unique: true},
    phoneNumber: {type: Number, required: false},
    password: {type:String, required: true}
})

const User = mongoose.model('Users', userSchema);

module.exports = User;