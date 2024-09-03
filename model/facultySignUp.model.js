const mongoose = require('mongoose');

const facultySignUpSchema = new mongoose.Schema({
            loginAs: {type:String, required : true},
			password: {type:String, required: true},
			Category: {type:String, required : false},
			Name: {type:String, required : true},
			Address: {type:String, required : false},
			City: {type:String, required : false},
			State: {type:String, required : false},
			PinCode: {type:String, required : false},
			ContactNumber: {type:String, required : false},
			ContactMail: {type:String, required : true},
			Course: [{
				Class: { type: String, required: false },
				Subject: { type: String, required: false }
			}]
})

const facultySignUp = mongoose.model('facultySignUp', facultySignUpSchema);

module.exports = facultySignUp;