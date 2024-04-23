const express = require('express');
const router = express.Router();

// const profile = require('../data/profile');
const Profile = require('../model/profile.model');


router.route("/").get(async (req,res) => {
    // res.json(profile.data);
    
    try {
        const profiles = await Profile.find({})
        profiles ? res.json(profiles) : res.status(404).json({message: "No data found"})
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;