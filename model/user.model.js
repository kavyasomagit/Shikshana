const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    loginAs: {type:String, required : true},
    Name: {type:String, required : true},
    ContactMail: {type:String, required: true, unique: true},
    ContactNumber: {type: Number, required: false},
    password: {type:String, required: true}
})

const User = mongoose.model('Users', userSchema);

module.exports = User;