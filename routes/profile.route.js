const express = require('express');
const router = express.Router();
const CryptoJS= require("crypto-js");

// const profile = require('../data/profile');
const Profile = require('../model/profile.model');
const Filter = require("../model/filter.model");
const facultySignUp = require("../model/facultySignUp.model"); 


async function updateFilterOptions(newProfile) {
    try {
        const filter = await Filter.findOne({ domainName: 'School' });

        if (!filter) {
            throw new Error('Filter document not found');
        }

        const filterFields = filter.filterName
        
        filterFields.forEach(field => {
            const newValue = newProfile[field];
            if (newValue) {
                const currentOptions = filter.filterOptions.get(field) || [];
                if (!currentOptions.includes(newValue)) {
                    currentOptions.push(newValue);
                    filter.filterOptions.set(field, currentOptions);
                }
            }
        });
        await filter.save();
    } catch (error) {
        console.error('Error updating filter options:', error.message);
    }
}


router.route("/").get(async (req,res) => {
    // res.json(profile.data);
    
    try {
        const profiles = await Profile.find({})
        profiles ? res.json(profiles) : res.status(404).json({message: "No data found"})
    } catch (error) {
        console.log(error);
    }
})

router.route("/addProfile").post(async(req,res) => {
    try {
        const existingProfile = await Profile.findOne({ ContactMail: req.body.ContactMail });
        const existingProfileFaculty = await facultySignUp.findOne({ContactMail: req.body.ContactMail});
        if (existingProfile || existingProfileFaculty) {
            return res.status(417).json({ error: 'There is already an existing faculty account with this email.' });
        }
        const newProfile = new facultySignUp({
            loginAs: req.body.loginAs,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET_KEY),
            Category: req.body.Category,
            Name: req.body.Name,
            Address: req.body.Address,
            City: req.body.City,
            State: req.body.State,
            PinCode: req.body.PinCode,
            Img: req.body.Img,
            ImgArr: req.body.ImgArr,
            ContactNumber: req.body.ContactNumber,
            ContactMail: req.body.ContactMail,
            Course: req.body.Course
        });

        const savedProfile = await newProfile.save();
        await updateFilterOptions(newProfile);
        res.status(201).json(savedProfile);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;