const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
            // id: {type:String, required : true},
			Category: {type:String, required : true},
			Name: {type:String, required : true},
			Address: {type:String, required : true},
			City: {type:String, required : true},
			State: {type:String, required : true},
			PinCode: {type:String, required : true},
			Img: {type:String, required : true},
			ImgArr: {type:Array, required : true},
			ContactNumber: {type:String, required : true},
			ContactMail: {type:String, required : true},
			Course: {type:String, required : true}
})


const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;