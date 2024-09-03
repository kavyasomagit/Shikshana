const mongoose = require('mongoose');

const wishListSchema =  new mongoose.Schema({
    profileId: {type:String, required : true},
    email: {type:String, required: true},
})

const wishList = mongoose.model('wishList', wishListSchema)

module.exports = wishList;