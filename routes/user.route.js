const express = require('express')
const mongoose =require('mongoose')
const CryptoJS= require("crypto-js");
const jwt = require('jsonwebtoken');

const userDetails = require('../model/user.model');
const Profile = require('../model/profile.model');
const facultySignUp = require("../model/facultySignUp.model"); 

const router = express.Router();

router.route('/register').post(async(req, res) => {
    console.log('123')
    const existingUserStudent = await userDetails.findOne({ContactMail: req.body.ContactMail});
    if (existingUserStudent) {
        return res.status(417).json({ error: 'There is already an existing student account with this email.' });
    }
try {
    const userDetail = new userDetails({
        loginAs: req.body.loginAs,
        Name : req.body.Name,
        ContactMail: req.body.ContactMail,
        ContactNumber: req.body.ContactNumber,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET_KEY)
    })
    const userDetailInDB = await userDetail.save()
    res.json(userDetailInDB)
} catch (error) {
    console.log(error)
    res.json({message: 'Not able to post the user details'})
}
})

router.route('/login').post(async (req,res) => {
try {
    const SingleUser = await userDetails.findOne({ContactMail: req.body.ContactMail})
    if(!SingleUser){
        res.status(401).json({message: 'Incorrect email Address'});
    }
    else{
        const decryptPassword = CryptoJS.AES.decrypt(SingleUser.password, process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    if(decryptPassword !== req.body.password){
        res.status(401).json({message: 'Invalid Password'})
    }else{
        //console.log(SingleUser);
        const {password, ...rest} = SingleUser._doc;
        const accessToken = jwt.sign({Name: SingleUser.Name}, process.env.ACCESS_TOKEN);
        res.json({...rest, accessToken})
    } 
    }
} catch (error) {
    //console.log(error)
    res.json({message: 'Not able to get the user details'})
}
})

router.route('/login/faculty').post(async (req,res) => {
    console.log(req.body);
    try {
        const SingleUser1 = await facultySignUp.findOne({ContactMail: req.body.ContactMail})
        const SingleUser2 = await Profile.findOne({ContactMail: req.body.ContactMail})

        const SingleUser = !SingleUser1 ? SingleUser2 : SingleUser1;
        if(!SingleUser){
            res.status(401).json({message: 'Incorrect email Address'});
        }else{
            const decryptPassword = CryptoJS.AES.decrypt(SingleUser.password, process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8);
            if(decryptPassword !== req.body.password){
                console.log('kavya', decryptPassword, req.body.password)
                res.status(401).json({message: 'Invalid Password'})
            }else{
                const {password, ...rest} = SingleUser._doc;
                const accessToken = jwt.sign({Name: SingleUser.Name}, process.env.ACCESS_TOKEN);
                res.json({...rest, accessToken})
            }
        }
        
    } catch (error) {
        //console.log(error)
        
        res.json({message: 'Not able to get the user details'})
    }
    })

router.route('/login/faculty').patch(async(req,res)=> {
    // console.log(req.body)
    try {
        // console.log('req.body',req.body)
        const { ContactMail, ...updates } = req.body;
        console.log('div',ContactMail, updates)
        const SingleUser1 = await facultySignUp.findOne({ContactMail: ContactMail})
        const SingleUser2 = await Profile.findOne({ContactMail: ContactMail})

        if(SingleUser1){
            const updateResult1 = await facultySignUp.updateOne({ ContactMail: ContactMail }, { $set: updates });
            res.json(updateResult1);
        }
        if(SingleUser2){
            const updateResult2 = await Profile.updateOne({ ContactMail: ContactMail }, { $set: updates });
            res.json(updateResult2);
        }
    } catch (error) {
        console.log(error)
    }
})

router.route('/find/faculty/details').post(async(req,res) => {
    console.log('kavya', req.body);
    try {
        const SingleUser1 = await facultySignUp.findOne({ContactMail: req.body.ContactMail})
        const SingleUser2 = await Profile.findOne({ContactMail: req.body.ContactMail})
        if(SingleUser1){
            res.json(SingleUser1);
        }
        else if(SingleUser2){
            res.json(SingleUser2);
            console.log(SingleUser2)
        }else{
            res.json({message:'Details Not found'})
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;