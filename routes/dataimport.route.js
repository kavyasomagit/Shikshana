const express = require('express');
const mongoose = require('mongoose');


const Profile = require("../model/profile.model");
const profiles = require("../data/profile");

const router = express.Router();

router.route("/").post(async (req, res) => {
    try {
        await Profile.deleteMany({});
        const profileInDB = await Profile.insertMany(profiles.data);
        res.json(profileInDB)
    } catch (error) {
        console.log(error)
        res.json({message: "Could not add to the DB"})
    }  
}).get(async(req, res) => {
    try {
        const profileInDB = await Profile.find({})
        res.json(profileInDB)
    } catch (error) {
        console.log(error)
        res.json({message: "Could not get the DB profiles"})
    }
})

module.exports = router;