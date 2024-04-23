const express = require('express')
const mongoose =require('mongoose')
const CryptoJS= require("crypto-js");
const jwt = require('jsonwebtoken');

const userDetails = require('../model/user.model');
const router = express.Router();

router.route('/register').post(async(req, res) => {
try {
    const userDetail = new userDetails({
        userName : req.body.userName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET_KEY)
    })
    const userDetailInDB = await userDetail.save()
    res.json(userDetailInDB)
} catch (error) {
    console.log(error)
    res.json({message: 'Not able to post the user details'})
}
})

router.route('/login').get(async (req,res) => {
try {
    const SingleUser = await userDetails.findOne({email: req.body.email})
    if(!SingleUser){
        res.status(401).json({message: 'Incorrect email Address'});
    }
    else{
        const decryptPassword = CryptoJS.AES.decrypt(SingleUser.password, process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    if(decryptPassword !== req.body.password){
        res.status(401).json({message: 'Invalid Password'}) 
    }else{
        console.log(SingleUser);
        const {password, ...rest} = SingleUser._doc;
        const accessToken = jwt.sign({username: SingleUser.userName}, process.env.ACCESS_TOKEN);
        res.json({...rest, accessToken})
    } 
    }
} catch (error) {
    console.log(error)
    res.json({message: 'Not able to get the user details'})
}
})
module.exports = router;